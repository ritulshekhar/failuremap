from sklearn.model_selection import (
    train_test_split,
)

from sklearn.pipeline import (
    Pipeline,
)

from sklearn.preprocessing import (
    LabelEncoder,
)

from sklearn.ensemble import (
    RandomForestClassifier,
    RandomForestRegressor,
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

    label_encoder = None

    if task_type == "classification":

        label_encoder = LabelEncoder()

        y = label_encoder.fit_transform(y)

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

        model = RandomForestClassifier(
            n_estimators=200,
            random_state=42,
        )

    else:

        model = RandomForestRegressor(
            n_estimators=200,
            random_state=42,
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

        "label_encoder": label_encoder,

    }