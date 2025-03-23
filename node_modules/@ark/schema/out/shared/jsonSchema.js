import { isKeyOf, printable, throwError, throwInternalError } from "@ark/util";
const unjsonifiableExplanations = {
    morph: "it represents a transformation, while JSON Schema only allows validation. Consider creating a Schema from one of its endpoints using `.in` or `.out`.",
    cyclic: "cyclic types are not yet convertible to JSON Schema. If this feature is important to you, please add your feedback at https://github.com/arktypeio/arktype/issues/1087"
};
const writeUnjsonifiableMessage = (description, explanation) => {
    let message = `${description} is not convertible to JSON Schema`;
    if (explanation) {
        const normalizedExplanation = isKeyOf(explanation, unjsonifiableExplanations) ?
            unjsonifiableExplanations[explanation]
            : explanation;
        message += ` because ${normalizedExplanation}`;
    }
    return message;
};
export const JsonSchema = {
    writeUnjsonifiableMessage,
    UnjsonifiableError: class UnjsonifiableError extends Error {
    },
    throwUnjsonifiableError: (...args) => throwError(writeUnjsonifiableMessage(...args)),
    throwInternalOperandError: (kind, schema) => throwInternalError(`Unexpected JSON Schema input for ${kind}: ${printable(schema)}`)
};
