def to_ascii_unicode(s):
    res = []
    for c in s:
        if ord(c) < 128:
            res.append(c)
        else:
            res.append(f"\\u{ord(c):04x}")
    return "".join(res)

hindi_q17 = [
    "अपनी बचत", "परिवार के सदस्यों द्वारा वित्तपोषण", "व्यवसाय का मुनाफा",
    "सोना/चांदी गिरवी रखकर", "सोना/चांदी बेचकर", "रिश्तेदारों से कर्ज",
    "साहूकार से ऋण", "SHG से ऋण", "OSF/SVEP से ऋण", "OSF/SVEP के तहत सब्सिडी/अनुदान",
    "निजी बचत समूह / बीसी से कर्ज", "NBFC / माइक्रोफाइनेंस ऋण", "मुद्रा लोन", "बैंक से ऋण"
]

raj_q17 = [
    "खुद री बचत", "घर रा जणा दिया", "धंधे रो मुनाफो",
    "सोना-चांदी गिरवी रख र", "सोना-चांदी बेच र", "नातेदारां सूं लोन",
    "साहूकार सूं कर्ज", "समूह सूं लोन", "OSF/SVEP सूं लोन", "योजना री सब्सिडी/अनुदान",
    "निजी बीसी/ग्रुप सूं लोन", "कंपनी रो लोन", "मुद्रा लोन", "बैंक सूं लोन"
]

en_q17 = [
    "Own Savings", "Financed by family member", "Profit from business",
    "Mortgaged gold/silver", "Sold gold/silver", "Loan from family",
    "Loan from moneylender", "Loan from SHG", "Loan from OSF/SVEP",
    "Subsidy/grant under OSF/SVEP", "Loan from private saving groups/BC",
    "Loan from NBFC", "Mudra loan", "Loan from banks"
]

hindi_q6 = [
    "कच्चा माल खरीद", "उत्पादन / निर्माण", "सेवा / मरम्मत",
    "सोशल मीडिया मार्केटिंग", "बिक्री (दुकान/घर-घर/सरस मेला/हाट)", "बही-खाता / हिसाब-किताब"
]

raj_q6 = [
    "कच्चो माल मोल लेवणो", "माल बणावणो", "सेवा / दुरुस्त करणो",
    "सोशल मीडिया प्रचार", "बिक्री (दुकान/घरां-घरां/सरस मेलो/हाट)", "हिसाब-किताब राखणो"
]

en_q6 = [
    "Purchase of material", "Production", "Servicing",
    "Social media marketing", "Sale (from shop/door to door/Saras fair/haat)", "Record keeping"
]

def make_list_str(arr):
    return 'LIST(' + ', '.join([f'"{x}"' for x in arr]) + ')'

f_q17 = f'=IFS(ANY(SELECT(AppUser[Language], [Email] = USEREMAIL())) = "Hindi", {make_list_str(hindi_q17)}, ANY(SELECT(AppUser[Language], [Email] = USEREMAIL())) = "Rajasthani", {make_list_str(raj_q17)}, TRUE, {make_list_str(en_q17)})'

f_q6 = f'=IFS(ANY(SELECT(AppUser[Language], [Email] = USEREMAIL())) = "Hindi", {make_list_str(hindi_q6)}, ANY(SELECT(AppUser[Language], [Email] = USEREMAIL())) = "Rajasthani", {make_list_str(raj_q6)}, TRUE, {make_list_str(en_q6)})'

print("Q17 Formula ASCII escaped length:", len(to_ascii_unicode(f_q17)))
print("Q6 Formula ASCII escaped length:", len(to_ascii_unicode(f_q6)))

with open('scratch/escaped_formulas.json', 'w', encoding='utf-8') as f:
    import json
    json.dump({
        'q17': to_ascii_unicode(f_q17),
        'q6': to_ascii_unicode(f_q6)
    }, f)
