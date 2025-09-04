import json, os, pathlib
from typing import Dict, List, Any
from telegram import Update
from telegram.ext import Application, CommandHandler, ContextTypes

DATA_FILE = pathlib.Path(__file__).with_name("data.json")

def load_data() -> Dict[str, List[dict]]:
    try:
        if DATA_FILE.exists() and DATA_FILE.stat().st_size > 0:
            return json.loads(DATA_FILE.read_text(encoding="utf-8"))
        else:
            return {}
    except json.JSONDecodeError:
        return {}

def save_data(data: Dict[str, List[dict]]) -> None:
    DATA_FILE.write_text(json.dumps(data, ensure_ascii=False, indent=2))

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text(
        "👋 Hi! I’m your To-Do bot.\n"
        "Commands:\n"
        "/add <task> – add a task\n"
        "/list – show tasks\n"
        "/done <id> – mark task done\n"
        "/help – show help"
    )

async def help_cmd(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await start(update, context)

async def add(update: Update, context: ContextTypes.DEFAULT_TYPE):
    data = load_data()
    uid = str(update.effective_user.id)
    text = " ".join(context.args).strip()
    if not text:
        await update.message.reply_text("Usage: /add Buy milk")
        return
    data.setdefault(uid, []).append({"text": text, "done": False})
    save_data(data)
    await update.message.reply_text(f"✅ Added: {text}")

def fmt_tasks(tasks: List[dict]) -> str:
    if not tasks:
        return "No tasks yet. Add one with /add."
    lines = []
    for i, t in enumerate(tasks, start=1):
        box = "✅" if t["done"] else "⬜"
        lines.append(f"{i}. {box} {t['text']}")
    return "\n".join(lines)

async def list_cmd(update: Update, context: ContextTypes.DEFAULT_TYPE):
    data = load_data()
    uid = str(update.effective_user.id)
    await update.message.reply_text(fmt_tasks(data.get(uid, [])))

async def done(update: Update, context: ContextTypes.DEFAULT_TYPE):
    data = load_data()
    uid = str(update.effective_user.id)
    tasks = data.get(uid, [])
    if not context.args:
        await update.message.reply_text("Usage: /done 2")
        return
    try:
        idx = int(context.args[0]) - 1
        if idx < 0 or idx >= len(tasks):
            raise ValueError
    except ValueError:
        await update.message.reply_text("Please provide a valid task id from /list.")
        return
    tasks[idx]["done"] = True
    save_data(data)
    await update.message.reply_text(f"🎉 Marked done: {tasks[idx]['text']}")

def main():
    token = os.getenv("TELEGRAM_TOKEN")
    if not token:
        raise SystemExit("Set TELEGRAM_TOKEN environment variable.")
    app = Application.builder().token(token).build()
    app.add_handler(CommandHandler("start", start))
    app.add_handler(CommandHandler("help", help_cmd))
    app.add_handler(CommandHandler("add", add))
    app.add_handler(CommandHandler("list", list_cmd))
    app.add_handler(CommandHandler("done", done))
    app.run_polling()

if __name__ == "__main__":
    main()
