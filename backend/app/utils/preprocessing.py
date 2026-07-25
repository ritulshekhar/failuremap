from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder


def build_preprocessor(X):

    numeric_features = (
        X.select_dtypes(
            include="number"
        ).columns
    )

    categorical_features = (
        X.select_dtypes(
            exclude="number"
        ).columns
    )

    numeric_transformer = Pipeline(
        [
            (
                "imputer",
                SimpleImputer(
                    strategy="median"
                ),
            )
        ]
    )

    categorical_transformer = Pipeline(
        [
            (
                "imputer",
                SimpleImputer(
                    strategy="most_frequent"
                ),
            ),
            (
                "encoder",
                OneHotEncoder(
                    handle_unknown="ignore"
                ),
            ),
        ]
    )

    preprocessor = ColumnTransformer(
        transformers=[
            (
                "num",
                numeric_transformer,
                numeric_features,
            ),
            (
                "cat",
                categorical_transformer,
                categorical_features,
            ),
        ]
    )

    return preprocessor