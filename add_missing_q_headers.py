with open('projects/CmF_SHG_Women_Entrepreneurs/scripts/generate_all_verbatim_files.py', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Section B Q6
old_b6 = 'add_row("LBL_B6a", "Survey", "FamilyAdultsCount", "QuestionPrompt, SectionB", "Text", "Adults (Above 18)-------", "Adults count", "Question Label", "Adults (Above 18)-------", "वयस्क (18 वर्ष से अधिक)", "बड़ा (18 साल सूं ऊपर)")'
new_b6 = 'add_row("LBL_B6", "Survey", "FamilyAdultsCount", "QuestionPrompt, SectionB, Header", "Text", "Q6. Give details of the family members? (count)", "Give details of the family members? (count)", "Question Label", "Q6. Give details of the family members? (count)", "प्र.6 परिवार के सदस्यों का विवरण दें? (संख्या)", "प्र.6 परिवार रा सदस्यां रो ब्योरो देवो? (गिनती)")\n' + old_b6

# 2. Section C Q7
old_c7 = 'add_row("LBL_C7a", "Survey", "Sourcing_NearbyTown_Pct", "QuestionPrompt, SectionC", "Text", "Nearby town/district (0%/25%/50%/75%/100%)", "Sourcing nearby", "Question Label", "Nearby town/district (0%/25%/50%/75%/100%)", "आस-पास का कस्बा / जिला", "आस-पास रो कस्बो / जिलो")'
new_c7 = 'add_row("LBL_C7", "Survey", "Sourcing_NearbyTown_Pct", "QuestionPrompt, SectionC, Header", "Text", "Q7. What percentage of material do you source from these places?", "What percentage of material do you source from these places?", "Question Label", "Q7. What percentage of material do you source from these places?", "प्र.7 आप इन स्थानों से कितने प्रतिशत सामग्री खरीदते हैं?", "प्र.7 थे इण जगां सूं कित्ता टका माल खरीदो हो?")\n' + old_c7

# 3. Section C Q10
old_c10 = 'add_row("LBL_C10a", "Survey", "SalesChannel_Online_Pct", "QuestionPrompt, SectionC", "Text", "Online platforms ( 0%/ upto 15%/upto 30%/upto 45%/upto 60%/upto 75%/upto 90%/100%)", "Online Sales %", "Question Label", "Online platforms ( 0%/ upto 15%/upto 30%/upto 45%/upto 60%/upto 75%/upto 90%/100%)", "ऑनलाइन प्लेटफॉर्म", "ऑनलाइन प्लेटफॉर्म")'
new_c10 = 'add_row("LBL_C10", "Survey", "SalesChannel_Online_Pct", "QuestionPrompt, SectionC, Header", "Text", "Q10. What percentage of your products/services get sold through following channels?", "What percentage of your products/services get sold through following channels?", "Question Label", "Q10. What percentage of your products/services get sold through following channels?", "प्र.10 आपके कितने प्रतिशत उत्पाद/सेवाएं निम्नलिखित माध्यमों से बिकते हैं?", "प्र.10 थारो कित्तो माल इण जरियां सूं बिकै है?")\n' + old_c10

# 4. Section E Q5
old_e5 = 'add_row("LBL_E5a", "Survey", "Competitors_Similar_Scale", "QuestionPrompt, SectionE", "Text", "Same business scale ______", "Same scale count", "Question Label", "Same business scale ______", "समान व्यवसाय स्तर के लोग", "बराबर रा धंधा वाळा")'
new_e5 = 'add_row("LBL_E5", "Survey", "Competitors_Similar_Scale", "QuestionPrompt, SectionE, Header", "Text", "Q5. How many people in your village are in the same business as yours?", "How many people in your village are in the same business as yours?", "Question Label", "Q5. How many people in your village are in the same business as yours?", "प्र.5 आपके गांव में कितने लोग आपके जैसा ही व्यवसाय कर रहे हैं?", "प्र.5 थारे गांव में कित्ता जणा थारे जिसो ही धंधो कर रह्या है?")\n' + old_e5

# 5. Section G Q5
old_g5 = 'add_row("LBL_G5a", "Survey", "MonthlyIncomeBeforeLoan", "QuestionPrompt, SectionG", "Text", "Income before the changes: Rs-------", "Income before changes", "Question Label", "Income before the changes: Rs-------", "बदलाव से पहले आय: रुपये", "बदलाव सूं पेली री कमाई: रुपिया")'
new_g5 = 'add_row("LBL_G5", "Survey", "MonthlyIncomeBeforeLoan", "QuestionPrompt, SectionG, Header", "Text", "Q5. After the changes you made with the loan from SHG (SVEP/OSF),  did you see any increase in monthly income ?", "After the changes you made with the loan from SHG (SVEP/OSF), did you see any increase in monthly income ?", "Question Label", "Q5. After the changes you made with the loan from SHG (SVEP/OSF),  did you see any increase in monthly income ?", "प्र.5 SHG (SVEP/OSF) से मिले ऋण से किए गए बदलावों के बाद, क्या आपकी मासिक आय में कोई वृद्धि हुई?", "प्र.5 समूह (SVEP/OSF) रा लोन सूं कियोड़ा बदलाव पछै, कांई थारी महीनवारी कमाई बधी?")\n' + old_g5

for o, n, name in [(old_b6, new_b6, "B6"), (old_c7, new_c7, "C7"), (old_c10, new_c10, "C10"), (old_e5, new_e5, "E5"), (old_g5, new_g5, "G5")]:
    if o in text:
        text = text.replace(o, n)
        print(f"[OK] Replaced {name}")
    else:
        print(f"[FAIL] Could not find {name}")

with open('projects/CmF_SHG_Women_Entrepreneurs/scripts/generate_all_verbatim_files.py', 'w', encoding='utf-8') as f:
    f.write(text)

print("generate_all_verbatim_files.py successfully updated with all missing question headers!")
