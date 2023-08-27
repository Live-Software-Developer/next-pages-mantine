import { IconPhoto, IconVideo, IconCode, IconTextCaption, IconCodePlus } from "@tabler/icons";

interface FieldOptions {
    [key: string]: {
        fields: {
            type: string;
            value: string | string[];
            [key: string]: any;
        };
        icon: any;
    };
}


export const FIELD_OPTIONS: FieldOptions = {
    image: {
        fields: {
            type: "image",
            value: "",
            alt: "",
            radius: ""
        },
        icon: IconPhoto
    },
    video: {
        fields: {
            type: "video",
            value: "",
            title: "",
        },
        icon: IconVideo
    },
    code: {
        fields: {
            type: "code",
            filename: "",
            value: "",
            language: "",
            highlightedLines: [],
            withLineNumbers: false,
        },
        icon: IconCode
    },
    text: {
        fields: {
            type: "text",
            value: "",
        },
        icon: IconTextCaption
    },
    codes: {
        fields: {
            type: "codes",
            value: []
        },
        icon: IconCodePlus
    }
}

export const OPTIONS = [
    'text',
    'code',
    'video',
    'codes',
    'image',
  ]


export const LANGUAGES: string[] = [
    "c",
    "go",
    "markup",
    "bash",
    "clike",
    "cpp",
    "css",
    "javascript",
    "jsx",
    "coffeescript",
    "actionscript",
    "css-extr",
    "diff",
    "git",
    "graphql",
    "handlebars",
    "json",
    "less",
    "makefile",
    "markdown",
    "objectivec",
    "ocaml",
    "python",
    "reason",
    "sass",
    "scss",
    "sql",
    "stylus",
    "tsx",
    "typescript",
    "wasm",
    "yaml",
];