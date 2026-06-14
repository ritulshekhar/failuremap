import pandas as pd

from sklearn.compose import (
    ColumnTransformer
)

from sklearn.pipeline import (
    Pipeline
)

from sklearn.impute import (
    SimpleImputer
)

from sklearn.preprocessing import (
    OneHotEncoder
)

from sklearn.model_selection import (
    train_test_split
)

from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    mean_absolute_error,
    root_mean_squared_error,
    r2_score
)

from xgboost import (
    XGBClassifier,
    XGBRegressor
)
def train_model(
    df,
    target_column
):

    X = df.drop(
        columns=[target_column]
    )

    y = df[
        target_column
    ]

    task_type = (
        "classification"
        if y.nunique() < 20
        else "regression"
    )

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

    numeric_transformer = (
        Pipeline([
            (
                "imputer",
                SimpleImputer(
                    strategy="median"
                )
            )
        ])
    )

    categorical_transformer = (
        Pipeline([
            (
                "imputer",
                SimpleImputer(
                    strategy="most_frequent"
                )
            ),
            (
                "encoder",
                OneHotEncoder(
                    handle_unknown="ignore"
                )
            )
        ])
    )

    preprocessor = (
        ColumnTransformer(
            transformers=[
                (
                    "num",
                    numeric_transformer,
                    numeric_features
                ),
                (
                    "cat",
                    categorical_transformer,
                    categorical_features
                )
            ]
        )
    )

    X_train, X_test, y_train, y_test = (
        train_test_split(
            X,
            y,
            test_size=0.2,
            random_state=42
        )
    )

    if task_type == "classification":

        model = XGBClassifier(
            random_state=42
        )

    else:

        model = XGBRegressor(
            random_state=42
        )

    pipeline = Pipeline([
        (
            "preprocessor",
            preprocessor
        ),
        (
            "model",
            model
        )
    ])

    pipeline.fit(
        X_train,
        y_train
    )

    predictions = pipeline.predict(
        X_test
    )

    if task_type == "classification":

        metrics = {

            "task":
            "classification",

            "accuracy":
            round(
                accuracy_score(
                    y_test,
                    predictions
                ),
                4
            ),

            "precision":
            round(
                precision_score(
                    y_test,
                    predictions,
                    average="weighted"
                ),
                4
            ),

            "recall":
            round(
                recall_score(
                    y_test,
                    predictions,
                    average="weighted"
                ),
                4
            ),

            "f1":
            round(
                f1_score(
                    y_test,
                    predictions,
                    average="weighted"
                ),
                4
            )
        }

    else:

        metrics = {

            "task":
            "regression",

            "mae":
            round(
                mean_absolute_error(
                    y_test,
                    predictions
                ),
                4
            ),

            "rmse":
            round(
                root_mean_squared_error(
                    y_test,
                    predictions
                ),
                4
            ),

            "r2":
            round(
                r2_score(
                    y_test,
                    predictions
                ),
                4
            )
        }

    return metrics