from sklearn.model_selection import (
    train_test_split,
)

from sklearn.pipeline import (
    Pipeline,
)

from xgboost import (
    XGBClassifier,
    XGBRegressor,
)

from app.utils.preprocessing import (
    build_preprocessor,
)

from app.utils.metrics import (
    calculate_metrics,
)


def train_model(
    df,
    target_column,
):

    X = df.drop(
        columns=[target_column]
    )

    y = df[target_column]

    task_type = (
        "classification"
        if y.nunique() < 20
        else "regression"
    )

    preprocessor = (
        build_preprocessor(X)
    )

    X_train, X_test, y_train, y_test = (
        train_test_split(
            X,
            y,
            test_size=0.2,
            random_state=42,
        )
    )

    if task_type == "classification":

        model = XGBClassifier(
            random_state=42,
            eval_metric="logloss",
            n_estimators=100,
        )

    else:

        model = XGBRegressor(
            random_state=42,
            n_estimators=100,
        )

    pipeline = Pipeline(
        [
            (
                "preprocessor",
                preprocessor,
            ),
            (
                "model",
                model,
            ),
        ]
    )

    pipeline.fit(
        X_train,
        y_train,
    )

    predictions = pipeline.predict(
        X_test
    )

    metrics = calculate_metrics(
        task_type,
        y_test,
        predictions,
    )

    return {

        "task": task_type,

        "metrics": metrics,

        "model": pipeline,

        "predictions": predictions,

        "X_test": X_test,

        "y_test": y_test,

    }