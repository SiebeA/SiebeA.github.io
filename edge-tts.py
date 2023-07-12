#!/usr/bin/env python3

"""
Streaming TTS example with subtitles.

This example is similar to the example basic_audio_streaming.py, but it shows
WordBoundary events to create subtitles using SubMaker.
"""

import asyncio
import edge_tts

voices = """
Name: es-AR-ElenaNeural
Gender: Female

Name: es-BO-SofiaNeural
Gender: Female

Name: es-CL-CatalinaNeural
Gender: Female

Name: es-CO-SalomeNeural
Gender: Female

Name: es-CR-MariaNeural
Gender: Female

Name: es-CU-BelkysNeural
Gender: Female

Name: es-DO-RamonaNeural
Gender: Female

Name: es-EC-AndreaNeural
Gender: Female

Name: es-ES-ElviraNeural
Gender: Female

Name: es-GQ-TeresaNeural
Gender: Female

Name: es-GT-MartaNeural
Gender: Female

Name: es-HN-KarlaNeural
Gender: Female

Name: es-MX-DaliaNeural
Gender: Female

Name: es-NI-YolandaNeural
Gender: Female

Name: es-PA-MargaritaNeural
Gender: Female

Name: es-PE-CamilaNeural
Gender: Female

Name: es-PR-KarinaNeural
Gender: Female

Name: es-PY-TaniaNeural
Gender: Female

Name: es-SV-LorenaNeural
Gender: Female

Name: es-US-PalomaNeural
Gender: Female

Name: es-UY-ValentinaNeural
Gender: Female

Name: es-VE-PaolaNeural
Gender: Female
"""

# store voices in a list
voices = voices.split("\n\n")

voices_list = []
for i in range(1, len(voices)):
    # print(voices[i][0][6:])
    voices_list.append(voices[i][6:-15])



async def amain() -> None:
    """Main function"""
    communicate = edge_tts.Communicate(TEXT, VOICE2, rate=RATE)
    submaker = edge_tts.SubMaker()
    with open(OUTPUT_FILE, "wb") as file:
        async for chunk in communicate.stream():
            if chunk["type"] == "audio":
                file.write(chunk["data"])
            elif chunk["type"] == "WordBoundary":
                submaker.create_sub((chunk["offset"], chunk["duration"]), chunk["text"])


TEXT = "Amigo, Soy un hombre de los paises Bajos"
# VOICE = "es-ES-ElviraNeural"
VOICE2 = voices_list[2]
OUTPUT_FILE = "test.mp3"
RATE = "-10%"
# WEBVTT_FILE = "test.vtt"

if __name__ == "__main__":
    loop = asyncio.get_event_loop_policy().get_event_loop()
    try:
        loop.run_until_complete(amain())
    finally:
        loop.close()


# play the audio file
import os
os.system("test.mp3")



