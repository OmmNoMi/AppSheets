with open('projects/CmF_SHG_Women_Entrepreneurs/data/Survey.csv', 'r', encoding='utf-8', errors='ignore') as f:
    header = f.readline().strip().split(',')

cols_to_check = ['AttendedTraining', 'TrainingDetails', 'UsedTrainingComponent', 'UsedTrainingDetails', 'ExpectationsFromScheme']
for c in cols_to_check:
    print(f"Is {c} in Survey.csv?", c in header)
