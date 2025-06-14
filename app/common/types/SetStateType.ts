import { Dispatch, SetStateAction } from "react";

export type StringSetter  = Dispatch<SetStateAction<string>>;
export type StringOrUndefinedSetter  = Dispatch<SetStateAction<string | undefined>>;

export type BooleanSetter  = Dispatch<SetStateAction<boolean>>;
export type BooleanOrUndefinedSetter  = Dispatch<SetStateAction<boolean | undefined>>;

export type NumberSetter  = Dispatch<SetStateAction<number>>;
export type NumberOrUndefinedSetter  = Dispatch<SetStateAction<number | undefined>>;