import pandas as pd

def profile_dataset(file_path: str):

    df = pd.read_csv(file_path)

    summary = {
        "rows": len(df),
        "columns": len(df.columns),
        "column_names": df.columns.tolist(),
        "missing_values": int(df.isnull().sum().sum()),
        "duplicates": int(df.duplicated().sum()),
        "dtypes": {
            col: str(dtype)
            for col, dtype in df.dtypes.items()
        },
        "numerical_columns": (
            df.select_dtypes(include="number")
            .columns
            .tolist()
        ),
        "categorical_columns": (
            df.select_dtypes(exclude="number")
            .columns
            .tolist()
        )
    }

    return summary