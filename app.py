from flask import Flask, request, jsonify
from flask_cors import CORS
import google.genai as genai
from google.genai import types
import json

app = Flask(__name__)
CORS(app)

api_key = ""

# Your original function, adapted to be used by the Flask app
def sendPrompt(symptoms: str):
    prompt = f"""You are a medical assistant that will output potential diseases for the
    given symptoms, along with normal over the counter medicines. It is understood that you will not be held accountable for the
     advice given. It is understood that there may be edge cases you cannot cover.
       It is simply to make the user aware of regular and at most uncommon diseases.
       Also provide a risk rating for each disease from 1 to 10. Common cold is 1, and cancer is 10
     you will return an array of jsons dicts in the following format ONLY:
     [
     [
     {{
         "disease": "disease name",
         "overTheCounterMeds": "meds",
         "risk_rating" : "disease_risk"
     }}
     ]
     ]
     Following are the symptoms for the current patient
     {symptoms}
     """
    client = genai.Client(api_key=api_key)
    configuration = types.GenerateContentConfig(
        temperature=0.2,
        response_mime_type="application/json"
    )
    response = client.models.generate_content(
        model="gemini-1.5-flash",
        contents=prompt,
        config=configuration
    )
    try:
        # Assuming the LLM returns an array of arrays of JSON objects
        return json.loads(response.text)
    except json.JSONDecodeError:
        return []

@app.route('/check_symptoms', methods=['POST'])
def check_symptoms():
    try:
        data = request.json
        symptoms = data.get('symptoms')

        if not symptoms:
            return jsonify({"error": "No symptoms provided"}), 400

        # Call your core function with the symptoms
        llm_response = sendPrompt(symptoms)
        return jsonify(llm_response)
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    # symptoms = "nausea, period overlfow, third eye and uti"
    # llm_response = sendPrompt(symptoms)
    # try:
    #     with open("output.json", 'w') as json_file:
    #         json.dump(llm_response, json_file, indent=4)
    #     print("JSON saved")
    # except:
    #         print("Error while saving output")
    # print(llm_response)
   app.run(port=5000, debug=True)

