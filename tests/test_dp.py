from sqlalchemy import text

from src.database.database import engine

try:
    with engine.connect() as conn:
        result = conn.execute(text("SELECT 1"))
        print("✅ MySQL Connected Successfully!")
        print(result.scalar())

except Exception as e:
    print("❌ Database Connection Failed")
    print(e)