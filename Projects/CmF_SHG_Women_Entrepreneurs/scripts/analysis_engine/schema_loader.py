"""
Dynamic AppVariables Schema and Metadata Loader.
Extracts questions, enum values, enterprise activities, capital sources,
and handles option normalization directly from WCH - AppVariables.csv.
"""

import pandas as pd
from typing import Dict, List, Tuple, Any


class SchemaRegistry:
    """Manages question schemas, options, and business activities from AppVariables."""

    def __init__(self, appvars_path: str):
        self.df_vars = pd.read_csv(appvars_path)
        self.var_dict = self._build_lookup_dict()

    def _build_lookup_dict(self) -> Dict[str, str]:
        lookup = {}
        for _, r in self.df_vars.iterrows():
            vid = str(r['ID']).strip() if pd.notna(r['ID']) else ''
            vtitle = str(r['Title']).strip() if pd.notna(r['Title']) else ''
            if vid:
                lookup[vid] = vtitle
        return lookup

    def resolve(self, val: Any) -> str:
        """Resolve a single enum code to its human-readable title."""
        if pd.isna(val):
            return ""
        s = str(val).strip()
        return self.var_dict.get(s, s)

    def resolve_list(self, val: Any) -> List[str]:
        """Resolve a comma-separated list of enum codes."""
        if pd.isna(val):
            return []
        items = [x.strip() for x in str(val).split(',') if x.strip()]
        return [self.resolve(it) for it in items]

    def get_column_options(self, column: str) -> List[Tuple[str, str]]:
        """Return list of (option_id, option_title) for a given survey column."""
        sub = self.df_vars[self.df_vars['Column'] == column]
        opts = []
        for _, r in sub.iterrows():
            oid = str(r['ID']).strip()
            title = str(r['Title']).strip()
            if not oid.startswith('Q_') and not oid.startswith('SubTable_'):
                opts.append((oid, title))
        return opts

    @staticmethod
    def get_business_activities() -> List[Tuple[str, int, str, List[str]]]:
        """
        Returns the 29 canonical enterprise activities:
        Tuple: (Sector, Number, Activity Title, Enum Codes)
        """
        return [
            # Trading (1-9)
            ("Trading", 1, "Vegetable/Fruit", ["ACT_VEG_FRUIT"]),
            ("Trading", 2, "Grocery", ["ACT_GROCERY"]),
            ("Trading", 3, "Fancy/Cosmetic/General store", ["ACT_FANCY_STORE"]),
            ("Trading", 4, "Apparel/fabric", ["ACT_APPAREL"]),
            ("Trading", 5, "Electric goods", ["ACT_ELECTRIC"]),
            ("Trading", 6, "Stone shop", ["ACT_STONE"]),
            ("Trading", 7, "Agri-input retail,", ["ACT_AGRI_INPUT"]),
            ("Trading", 8, "AI/breeding kits", ["ACT_AI_KITS"]),
            ("Trading", 9, "Goat trading", ["ACT_GOAT"]),
            # Service (10-18)
            ("Service", 10, "Flour mill", ["ACT_FLOUR_MILL"]),
            ("Service", 11, "Tailoring", ["ACT_TAILORING"]),
            ("Service", 12, "Beauty parlour", ["ACT_BEAUTY_PARLOUR"]),
            ("Service", 13, "Auto-mechanic/ two-wheeler repair", ["ACT_AUTO_MECHANIC"]),
            ("Service", 14, "E-mitra", ["ACT_EMITRA"]),
            ("Service", 15, "Transport", ["ACT_TRANSPORT"]),
            ("Service", 16, "Tent house", ["ACT_TENT_HOUSE"]),
            ("Service", 17, "Mobile repair shop", ["ACT_MOBILE_REPAIR"]),
            ("Service", 18, "Stone cutting", ["ACT_STONE_CUTTING"]),
            # Production (19-29)
            ("Production", 19, "Sanitary napkin making", ["ACT_SANITARY_NAPKIN"]),
            ("Production", 20, "Handicraft", ["ACT_HANDICRAFT"]),
            ("Production", 21, "Dairy shop/Milk collection centre", ["ACT_DAIRY_MILK"]),
            ("Production", 22, "Juice", ["ACT_JUICE"]),
            ("Production", 23, "Food processing (pickle/badi/papad making)", ["ACT_FOOD_PROCESSING"]),
            ("Production", 24, "Food making (Sweets/Namkeen/hotel)", ["ACT_FOOD_MAKING"]),
            ("Production", 25, "Sweet box making", ["ACT_SWEET_BOX"]),
            ("Production", 26, "Flag making", ["ACT_FLAG_MAKING"]),
            ("Production", 27, "Leather products", ["ACT_LEATHER"]),
            ("Production", 28, "Stone idols", ["ACT_STONE_IDOLS"]),
            ("Production", 29, "Any other", ["ACT_ANY_OTHER", "ACT_JUTEBAG"])
        ]

    @staticmethod
    def get_capital_sources() -> List[Tuple[str, str]]:
        """Returns 14 capital sources: (Display Name, SubTable Question Group)."""
        return [
            ("Own Savings", "SubTable_LoanUsage_Own"),
            ("Financed by family member", "SubTable_LoanUsage_Family"),
            ("Profit from business", "SubTable_LoanUsage_Profit"),
            ("Mortgaged gold/silver", "SubTable_LoanUsage_Mortgaged"),
            ("Sold gold/silver", "SubTable_LoanUsage_Gold"),
            ("Loan from family", "SubTable_LoanUsage_FamilyLoan"),
            ("Moneylender", "SubTable_LoanUsage_MoneyLender"),
            ("SHG", "SubTable_LoanUsage_SHG"),
            ("OSF/SVEP", "SubTable_LoanUsage_OSFLoan"),
            ("Subsidy/grant", "SubTable_LoanUsage_OSFGrant"),
            ("Private saving groups/BC", "SubTable_LoanUsage_LoanPrivate"),
            ("NBFC", "SubTable_LoanUsage_LoanNBFC"),
            ("Mudra loan", "SubTable_LoanUsage_Mudra"),
            ("Banks", "SubTable_LoanUsage_Bank")
        ]

    @staticmethod
    def get_loan_usages() -> List[Tuple[int, str, str]]:
        """Returns 11 loan usages: (Number, Purpose Title, Enum Code)."""
        return [
            (1, "Seed capital to buy material and set up the shop", "SubTable_LoanUsage_Opt_a"),
            (2, "Buy new machine to increase the production capacity ( eg: sewing machine)", "SubTable_LoanUsage_Opt_b"),
            (3, "Buy assets to store and sell new products ( eg: fridge)", "SubTable_LoanUsage_Opt_c"),
            (4, "Get additional space to expand my business ( eg: addition of flour mill)", "SubTable_LoanUsage_Opt_d"),
            (5, "Buy more material to increase the product range offered (eg: clothes in a fancy store)", "SubTable_LoanUsage_Opt_e"),
            (6, "Buy more material/inputs to increase scale of business/production", "SubTable_LoanUsage_Opt_f"),
            (7, "Buy vehicle to access new market to buy/sell goods", "SubTable_LoanUsage_Opt_g"),
            (8, "Access better transport services to access new market to buy/sell goods", "SubTable_LoanUsage_Opt_h"),
            (9, "Buy mobile phone to promote/sell my goods online", "SubTable_LoanUsage_Opt_i"),
            (10, "Any other, specify……….", "SubTable_LoanUsage_Opt_j"),
            (11, "Not used the source", "SubTable_LoanUsage_Opt_k")
        ]

    @staticmethod
    def get_income_bracket_mappings() -> List[Tuple[str, List[str]]]:
        """Returns annual income brackets normalized for overflow categories (Rule B9)."""
        return [
            ("Less than Rs 80,000", ["INC_LT_80K"]),
            ("Rs 80,000 to Rs 1,20,000", ["INC_80K_120K"]),
            ("Rs 1,20,001 to Rs 1,60,000", ["INC_120K_160K"]),
            ("Rs 1,60,001 to Rs 2,00,000", ["INC_160K_200K"]),
            ("Rs 2,00,001 to Rs 2,40,000", ["INC_200K_240K"]),
            ("Rs 2,40,001 to Rs 2,80,000", ["INC_240K_280K"]),
            ("Rs 2,80,001 to Rs 3,20,000", ["INC_280K_320K"]),
            ("Rs 3,20,001 to Rs 3,60,000", ["INC_320K_360K"]),
            ("Rs 3,60,001 to Rs 4,00,000", ["INC_360K_400K"]),
            ("Above Rs 4,00,001", [
                "INC_GT_400K", "INC_400K-440K", "INC_440K-480K",
                "INC_480K-520K", "INC_520K-560K", "INC_560K-600K",
                "INC_600K-640K", "INC_GT_640K"
            ])
        ]

    @staticmethod
    def get_monthly_income_increase_mappings() -> List[Tuple[str, List[str]]]:
        """Returns monthly income increase brackets normalized for overflow categories."""
        return [
            ("Upto Rs 2000", ["INC_UPTO_2K"]),
            ("Rs 2000 to Rs 3000", ["INC_2K_4K"]),
            ("Rs 3000 to Rs 4000", []),
            ("Rs 4000 to Rs 5000", ["INC_4K_6K"]),
            ("Rs 5000 to Rs 6000", []),
            ("Above Rs 6000", [
                "INC_GT_6K", "INC_6K_8K", "INC_8K_10K", "INC_10K_12K",
                "INC_12K_14K", "INC_14K_16K", "INC_16K_18K", "INC_18K_20K"
            ]),
            ("Cant say", ["INC_CANT_SAY"])
        ]
