# app.py

from flask import Flask, request, jsonify
import edge_tts

app = Flask(__name__)

@app.route("/tts", methods=["POST"])
def text_to_speech():
    # Retrieve the text, voice, and rate from the request
    text = request.form.get("text", "")
    voice = request.form.get("voice", "el-GR-AthinaNeural")
    rate = request.form.get("rate", "-10%")

    # Perform TTS using edge_tts library
    communicate = edge_tts.Communicate(text, voice, rate=rate)
    audio_data = b""
    async def generate_audio():
        nonlocal audio_data
        async for chunk in communicate.stream():
            if chunk["type"] == "audio":
                audio_data += chunk["data"]

    asyncio.run(generate_audio())

    # Return the audio as response
    return audio_data, 200, {"Content-Type": "audio/mpeg"}

if __name__ == "__main__":
    app.run()
