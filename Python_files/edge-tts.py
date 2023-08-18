#!/usr/bin/env python3

"""
Streaming TTS example with subtitles.

This example is similar to the example basic_audio_streaming.py, but it shows
WordBoundary events to create subtitles using SubMaker.
"""

import asyncio
import edge_tts

# voices_all
# voices_gr =
voices_es = """
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

# store voices_es in a list
voices_es = voices_es.split("\n\n")

voices_es_list = []
for i in range(1, len(voices_es)):
    # print(voices_es[i][0][6:])
    voices_es_list.append(voices_es[i][6:-15])



async def amain() -> None:
    """Main function"""
    communicate = edge_tts.Communicate(TEXT, VOICE_GREEK, rate=RATE)
    submaker = edge_tts.SubMaker()
    with open(OUTPUT_FILE, "wb") as file:
        async for chunk in communicate.stream():
            if chunk["type"] == "audio":
                file.write(chunk["data"])
            elif chunk["type"] == "WordBoundary":
                submaker.create_sub((chunk["offset"], chunk["duration"]), chunk["text"])


TEXT = "Πώς σε λένε? Με λένε Σειμπε! Τι κάνεις? Καλά ενχαριστώ!"
# TEXT = "Amigo, Soy un hombre de los paises Bajos"
# VOICE = "es-ES-ElviraNeural"
# VOICE2 = voices_es_list[2]
VOICE_GREEK = 'el-GR-AthinaNeural'
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



