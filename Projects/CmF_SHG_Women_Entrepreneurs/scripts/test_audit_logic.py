import json

# Let's inspect the check logic
aux = {
    "ItemSeparator": None,
    "EnumValues": [],
    "AllowOtherValues": True,
    "AutoCompleteOtherValues": True,
    "BaseType": "Ref",
    "BaseTypeQualifier": '{"ReferencedTableName":"AppVariables","ReferencedRootTableName":"AppVariables","ReferencedType":"Text"}',
    "EnumInputMode": "Auto",
    "Valid_If": '=SPLIT(LOOKUP("Q_A_16_00", "AppVariables", "ID", "VariableList"), " , ")'
}

# Old check:
old_is_ref = (aux.get("BaseType") == "Ref" or aux.get("ElementType") == "Ref") and aux.get("ReferencedTableName") == "AppVariables"
print("Old check result:", old_is_ref) # False! Because aux['ReferencedTableName'] is None!

# New robust check:
def check_is_ref(attr, aux):
    is_base_ref = aux.get("BaseType") == "Ref" or aux.get("ElementType") == "Ref" or attr.get("BaseType") == "Ref"
    has_appvar = False
    if "AppVariables" in str(aux.get("BaseTypeQualifier", "")):
        has_appvar = True
    if "AppVariables" in str(aux.get("ElementTypeQualifier", "")):
        has_appvar = True
    if aux.get("ReferencedTableName") == "AppVariables" or attr.get("ReferencedTableName") == "AppVariables":
        has_appvar = True
    return is_base_ref and has_appvar

print("New robust check result:", check_is_ref({}, aux)) # True!
