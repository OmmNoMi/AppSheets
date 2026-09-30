import csv

appvar_path = r'c:\Users\hardi\AppSheets\projects\CmF_SHG_Women_Entrepreneurs\data\AppVariables.csv'

with open(appvar_path, 'r', encoding='utf-8-sig') as f:
    reader = csv.DictReader(f)
    fieldnames = reader.fieldnames
    rows = list(reader)

all_13_sel = [
    'SEL_NOT_REL',
    'SEL_PRODUCE_WAIT_ORDERS',
    'SEL_DOOR_TO_DOOR',
    'SEL_PRIOR_ORDERS',
    'SEL_LOCAL_HAAT',
    'SEL_SARAS_FAIR',
    'SEL_INSTAGRAM',
    'SEL_WHATSAPP',
    'SEL_ONLINE_AMAZON',
    'SEL_ONLINE_MEESHO',
    'SEL_ONLINE_OTHER',
    'SEL_RAJEEVIKA',
    'SEL_OTHER'
]
vlist_sel = " , ".join(all_13_sel)

new_options = [
    {
        'ID': 'SEL_NOT_REL',
        'Table': 'Survey',
        'Column': 'SeasonalSalesMethod',
        'Tags': 'SellingMethodOption, SubOption',
        'ValueControl': 'Enum',
        'Title': 'Not relevant',
        'Description': 'Not relevant for this business',
        'UsedFor': 'Selling Method Option',
        'Decimal': '',
        'EnumValue': 'Not relevant',
        'EnumList': '',
        'VariableList': '',
        'DateValue': '',
        'Photo': '',
        'URL': '',
        'File': '',
        'Title_hi': 'लागू नहीं / प्रासंगिक नहीं',
        'Title_raj': 'लागू कोनी',
        'ActionIcon': '',
        'LastEditBy': 'Antigravity',
        'LastEditOn': '09/26/2026 09:50:00'
    },
    {
        'ID': 'SEL_PRODUCE_WAIT_ORDERS',
        'Table': 'Survey',
        'Column': 'SeasonalSalesMethod',
        'Tags': 'SellingMethodOption, SubOption',
        'ValueControl': 'Enum',
        'Title': 'In case of production related business, I produce slightly more than my last year sales and wait for orders',
        'Description': 'Produce slightly more than last year sales and wait for orders',
        'UsedFor': 'Selling Method Option',
        'Decimal': '',
        'EnumValue': 'In case of production related business, I produce slightly more than my last year sales and wait for orders',
        'EnumList': '',
        'VariableList': '',
        'DateValue': '',
        'Photo': '',
        'URL': '',
        'File': '',
        'Title_hi': 'उत्पादन से जुड़े व्यवसाय में, मैं पिछले साल की बिक्री से थोड़ा अधिक उत्पादन करती हूँ और ऑर्डर का इंतजार करती हूँ',
        'Title_raj': 'उत्पादन काम में, म्हे पाछले साल सूं थोड़ो बत्ती माल बणा’र आर्डर री बाट जोवां',
        'ActionIcon': '',
        'LastEditBy': 'Antigravity',
        'LastEditOn': '09/26/2026 09:50:00'
    },
    {
        'ID': 'SEL_DOOR_TO_DOOR',
        'Table': 'Survey',
        'Column': 'SeasonalSalesMethod',
        'Tags': 'SellingMethodOption, SubOption',
        'ValueControl': 'Enum',
        'Title': 'I visit local traders/shopkeepers with my products and do door to door selling',
        'Description': 'Visit local traders and do door to door selling',
        'UsedFor': 'Selling Method Option',
        'Decimal': '',
        'EnumValue': 'I visit local traders/shopkeepers with my products and do door to door selling',
        'EnumList': '',
        'VariableList': '',
        'DateValue': '',
        'Photo': '',
        'URL': '',
        'File': '',
        'Title_hi': 'मैं अपने उत्पादों के साथ स्थानीय व्यापारियों/दुकानदारों के पास जाती हूँ और घर-घर जाकर बिक्री करती हूँ',
        'Title_raj': 'म्हे माल ले’र दुकानदारां कनै अर घरे-घरे जा’र बेचण रो काम करां',
        'ActionIcon': '',
        'LastEditBy': 'Antigravity',
        'LastEditOn': '09/26/2026 09:50:00'
    },
    {
        'ID': 'SEL_PRIOR_ORDERS',
        'Table': 'Survey',
        'Column': 'SeasonalSalesMethod',
        'Tags': 'SellingMethodOption, SubOption',
        'ValueControl': 'Enum',
        'Title': 'I take orders from my usual clients few weeks prior to production/peak season and then sell',
        'Description': 'Take orders prior to peak season and then sell',
        'UsedFor': 'Selling Method Option',
        'Decimal': '',
        'EnumValue': 'I take orders from my usual clients few weeks prior to production/peak season and then sell',
        'EnumList': '',
        'VariableList': '',
        'DateValue': '',
        'Photo': '',
        'URL': '',
        'File': '',
        'Title_hi': 'मैं उत्पादन/पीक सीजन से कुछ हफ्ते पहले अपने नियमित ग्राहकों से ऑर्डर लेती हूँ और फिर बेचती हूँ',
        'Title_raj': 'म्हे सीजन सूं पैली ई गिरायकां सूं आर्डर ले’र पछै माल बेचां',
        'ActionIcon': '',
        'LastEditBy': 'Antigravity',
        'LastEditOn': '09/26/2026 09:50:00'
    },
    {
        'ID': 'SEL_LOCAL_HAAT',
        'Table': 'Survey',
        'Column': 'SeasonalSalesMethod',
        'Tags': 'SellingMethodOption, SubOption',
        'ValueControl': 'Enum',
        'Title': 'I sell in local haat/weekly market',
        'Description': 'Sell in local haat or weekly market',
        'UsedFor': 'Selling Method Option',
        'Decimal': '',
        'EnumValue': 'I sell in local haat/weekly market',
        'EnumList': '',
        'VariableList': '',
        'DateValue': '',
        'Photo': '',
        'URL': '',
        'File': '',
        'Title_hi': 'मैं स्थानीय हाट / साप्ताहिक बाजार में बेचती हूँ',
        'Title_raj': 'म्हे लोकल हाट / सातावारिया बजार में बेचां',
        'ActionIcon': '',
        'LastEditBy': 'Antigravity',
        'LastEditOn': '09/26/2026 09:50:00'
    },
    {
        'ID': 'SEL_SARAS_FAIR',
        'Table': 'Survey',
        'Column': 'SeasonalSalesMethod',
        'Tags': 'SellingMethodOption, SubOption',
        'ValueControl': 'Enum',
        'Title': 'I sell in Saras fair',
        'Description': 'Sell in Saras fair / exhibitions',
        'UsedFor': 'Selling Method Option',
        'Decimal': '',
        'EnumValue': 'I sell in Saras fair',
        'EnumList': '',
        'VariableList': '',
        'DateValue': '',
        'Photo': '',
        'URL': '',
        'File': '',
        'Title_hi': 'मैं सरस मेले में बेचती हूँ',
        'Title_raj': 'म्हे सरस मेला में बेचां',
        'ActionIcon': '',
        'LastEditBy': 'Antigravity',
        'LastEditOn': '09/26/2026 09:50:00'
    },
    {
        'ID': 'SEL_INSTAGRAM',
        'Table': 'Survey',
        'Column': 'SeasonalSalesMethod',
        'Tags': 'SellingMethodOption, SubOption',
        'ValueControl': 'Enum',
        'Title': 'I get orders via instagram',
        'Description': 'Get customer orders via Instagram',
        'UsedFor': 'Selling Method Option',
        'Decimal': '',
        'EnumValue': 'I get orders via instagram',
        'EnumList': '',
        'VariableList': '',
        'DateValue': '',
        'Photo': '',
        'URL': '',
        'File': '',
        'Title_hi': 'मुझे इंस्टाग्राम के माध्यम से ऑर्डर मिलते हैं',
        'Title_raj': 'म्हाने इंस्टाग्राम पै आर्डर मिलै',
        'ActionIcon': '',
        'LastEditBy': 'Antigravity',
        'LastEditOn': '09/26/2026 09:50:00'
    },
    {
        'ID': 'SEL_WHATSAPP',
        'Table': 'Survey',
        'Column': 'SeasonalSalesMethod',
        'Tags': 'SellingMethodOption, SubOption',
        'ValueControl': 'Enum',
        'Title': 'I get orders via whatsapp',
        'Description': 'Get customer orders via WhatsApp',
        'UsedFor': 'Selling Method Option',
        'Decimal': '',
        'EnumValue': 'I get orders via whatsapp',
        'EnumList': '',
        'VariableList': '',
        'DateValue': '',
        'Photo': '',
        'URL': '',
        'File': '',
        'Title_hi': 'मुझे व्हाट्सएप के माध्यम से ऑर्डर मिलते हैं',
        'Title_raj': 'म्हाने व्हाट्सएप पै आर्डर मिलै',
        'ActionIcon': '',
        'LastEditBy': 'Antigravity',
        'LastEditOn': '09/26/2026 09:50:00'
    },
    {
        'ID': 'SEL_ONLINE_AMAZON',
        'Table': 'Survey',
        'Column': 'SeasonalSalesMethod',
        'Tags': 'SellingMethodOption, SubOption',
        'ValueControl': 'Enum',
        'Title': 'I use online platforms like Amazon',
        'Description': 'Sell products online via Amazon',
        'UsedFor': 'Selling Method Option',
        'Decimal': '',
        'EnumValue': 'I use online platforms like Amazon',
        'EnumList': '',
        'VariableList': '',
        'DateValue': '',
        'Photo': '',
        'URL': '',
        'File': '',
        'Title_hi': 'मैं अमेज़न (Amazon) जैसे ऑनलाइन प्लेटफॉर्म का उपयोग करती हूँ',
        'Title_raj': 'म्हे अमेज़न (Amazon) जैसी ऑनलाइन साइट रो उपयोग करां',
        'ActionIcon': '',
        'LastEditBy': 'Antigravity',
        'LastEditOn': '09/26/2026 09:50:00'
    },
    {
        'ID': 'SEL_ONLINE_MEESHO',
        'Table': 'Survey',
        'Column': 'SeasonalSalesMethod',
        'Tags': 'SellingMethodOption, SubOption',
        'ValueControl': 'Enum',
        'Title': 'I use online platform like Meesho',
        'Description': 'Sell products online via Meesho',
        'UsedFor': 'Selling Method Option',
        'Decimal': '',
        'EnumValue': 'I use online platform like Meesho',
        'EnumList': '',
        'VariableList': '',
        'DateValue': '',
        'Photo': '',
        'URL': '',
        'File': '',
        'Title_hi': 'मैं मीशो (Meesho) जैसे ऑनलाइन प्लेटफॉर्म का उपयोग करती हूँ',
        'Title_raj': 'म्हे मीशो (Meesho) जैसी ऑनलाइन साइट रो उपयोग करां',
        'ActionIcon': '',
        'LastEditBy': 'Antigravity',
        'LastEditOn': '09/26/2026 09:50:00'
    },
    {
        'ID': 'SEL_ONLINE_OTHER',
        'Table': 'Survey',
        'Column': 'SeasonalSalesMethod',
        'Tags': 'SellingMethodOption, SubOption',
        'ValueControl': 'Enum',
        'Title': 'I use any other online platform',
        'Description': 'Sell products via other online platforms (Flipkart, Myntra, etc.)',
        'UsedFor': 'Selling Method Option',
        'Decimal': '',
        'EnumValue': 'I use any other online platform',
        'EnumList': '',
        'VariableList': '',
        'DateValue': '',
        'Photo': '',
        'URL': '',
        'File': '',
        'Title_hi': 'मैं किसी अन्य ऑनलाइन प्लेटफॉर्म का उपयोग करती हूँ',
        'Title_raj': 'म्हे दूजी कोई ऑनलाइन साइट रो उपयोग करां',
        'ActionIcon': '',
        'LastEditBy': 'Antigravity',
        'LastEditOn': '09/26/2026 09:50:00'
    },
    {
        'ID': 'SEL_RAJEEVIKA',
        'Table': 'Survey',
        'Column': 'SeasonalSalesMethod',
        'Tags': 'SellingMethodOption, SubOption',
        'ValueControl': 'Enum',
        'Title': 'I use RAJEEVIKA website',
        'Description': 'Sell products via RAJEEVIKA website / portal',
        'UsedFor': 'Selling Method Option',
        'Decimal': '',
        'EnumValue': 'I use RAJEEVIKA website',
        'EnumList': '',
        'VariableList': '',
        'DateValue': '',
        'Photo': '',
        'URL': '',
        'File': '',
        'Title_hi': 'मैं राजीविका (RAJEEVIKA) वेबसाइट / पोर्टल का उपयोग करती हूँ',
        'Title_raj': 'म्हे राजीविका वेबसाइट रो उपयोग करां',
        'ActionIcon': '',
        'LastEditBy': 'Antigravity',
        'LastEditOn': '09/26/2026 09:50:00'
    },
    {
        'ID': 'SEL_OTHER',
        'Table': 'Survey',
        'Column': 'SeasonalSalesMethod',
        'Tags': 'SellingMethodOption, SubOption',
        'ValueControl': 'Enum',
        'Title': 'Any other, specify',
        'Description': 'Any other selling method',
        'UsedFor': 'Selling Method Option',
        'Decimal': '',
        'EnumValue': 'Any other, specify',
        'EnumList': '',
        'VariableList': '',
        'DateValue': '',
        'Photo': '',
        'URL': '',
        'File': '',
        'Title_hi': 'अन्य कोई तरीका (विवरण दें)',
        'Title_raj': 'दूजो कोई तरीको (ब्यौरो दो)',
        'ActionIcon': '',
        'LastEditBy': 'Antigravity',
        'LastEditOn': '09/26/2026 09:50:00'
    }
]

existing_ids = {r['ID']: i for i, r in enumerate(rows)}

# Update Q_C_09_00
if 'Q_C_09_00' in existing_ids:
    idx = existing_ids['Q_C_09_00']
    rows[idx]['Title'] = 'Q9. How do you sell your products/services? (Multiselect)'
    rows[idx]['Description'] = 'Q9. How do you sell your products/services? (Multiselect)'
    rows[idx]['EnumValue'] = 'Q9. How do you sell your products/services? (Multiselect)'
    rows[idx]['Title_hi'] = 'Q9. आप अपने उत्पादों/सेवाओं की बिक्री कैसे करती हैं? (बहु-चयन)'
    rows[idx]['Title_raj'] = 'Q9. थे आपरा माल/सेवावां री बिक्री कियां करो हो?'
    rows[idx]['VariableList'] = vlist_sel
    rows[idx]['ValueControl'] = 'EnumList'
    print("Updated Q_C_09_00 with 13 Selling Options")

# Insert/Update the 13 options
for opt in new_options:
    oid = opt['ID']
    if oid in existing_ids:
        rows[existing_ids[oid]] = opt
        print(f"Updated {oid}")
    else:
        rows.append(opt)
        existing_ids[oid] = len(rows) - 1
        print(f"Inserted {oid}")

with open(appvar_path, 'w', encoding='utf-8-sig', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(rows)

tsv_path = r'c:\Users\hardi\AppSheets\projects\CmF_SHG_Women_Entrepreneurs\data\AppVariables_EXACT_SYNC.tsv'
with open(tsv_path, 'w', encoding='utf-8', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=fieldnames, delimiter='\t')
    writer.writeheader()
    writer.writerows(rows)

print(f"Saved updated AppVariables.csv (Total rows: {len(rows)})")
