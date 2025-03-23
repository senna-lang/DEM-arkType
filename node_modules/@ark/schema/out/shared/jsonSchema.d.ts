import { type autocomplete, type JsonArray, type JsonObject, type listable } from "@ark/util";
import type { ConstraintKind } from "./implement.ts";
export type JsonSchema = JsonSchema.Union | JsonSchema.Branch;
export declare namespace JsonSchema {
    type TypeName = "string" | "integer" | "number" | "object" | "array" | "boolean" | "null";
    /**
     *  a subset of JSON Schema's annotations, see:
     *  https://json-schema.org/understanding-json-schema/reference/annotations
     **/
    type Meta<t = unknown> = {
        title?: string;
        description?: string;
        deprecated?: true;
        default?: t;
        examples?: readonly t[];
    };
    type Branch = Constrainable | Const | String | Numeric | Object | Array;
    interface Constrainable extends Meta {
        type?: listable<TypeName>;
    }
    interface Union extends Meta {
        anyOf: readonly Branch[];
    }
    interface Const extends Meta {
        const: unknown;
    }
    interface String extends Meta<string> {
        type: "string";
        minLength?: number;
        maxLength?: number;
        pattern?: string;
        format?: string;
    }
    interface Numeric extends Meta<number> {
        type: "number" | "integer";
        multipleOf?: number;
        minimum?: number;
        exclusiveMinimum?: number;
        maximum?: number;
        exclusiveMaximum?: number;
    }
    interface Object extends Meta<JsonObject> {
        type: "object";
        properties?: Record<string, JsonSchema>;
        required?: string[];
        patternProperties?: Record<string, JsonSchema>;
        additionalProperties?: false | JsonSchema;
    }
    interface Array extends Meta<JsonArray> {
        type: "array";
        minItems?: number;
        maxItems?: number;
        items?: JsonSchema | false;
        prefixItems?: readonly JsonSchema[];
    }
    type LengthBoundable = String | Array;
    type Structure = Object | Array;
    type UnjsonifiableError = InstanceType<typeof JsonSchema.UnjsonifiableError>;
}
type UnjsonifiableExplanation = autocomplete<"morph" | "cyclic">;
export declare const JsonSchema: {
    writeUnjsonifiableMessage: (description: string, explanation?: UnjsonifiableExplanation) => string;
    UnjsonifiableError: {
        new (message?: string): {
            name: string;
            message: string;
            stack?: string;
            cause?: unknown;
        };
        new (message?: string, options?: ErrorOptions): {
            name: string;
            message: string;
            stack?: string;
            cause?: unknown;
        };
        captureStackTrace(targetObject: object, constructorOpt?: Function): void;
        prepareStackTrace?: ((err: Error, stackTraces: NodeJS.CallSite[]) => any) | undefined;
        stackTraceLimit: number;
    };
    throwUnjsonifiableError: (description: string, explanation?: UnjsonifiableExplanation | undefined) => never;
    throwInternalOperandError: (kind: ConstraintKind, schema: JsonSchema) => never;
};
export {};
