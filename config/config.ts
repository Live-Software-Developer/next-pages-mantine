import axios, { AxiosRequestConfig } from "axios";
import { BLUE_DARK_COLOR } from "./constants"
import { MantineTheme } from "@mantine/core";

export const getTheme = (theme: MantineTheme) => {
    return theme?.colorScheme === "dark"
}

export const getPrimaryColor = (theme: MantineTheme) => {
    return theme?.colors?.orange[6]
}

export const formatCurrency = (price: any) => {
    return Number(price).toLocaleString()
}

export const checkIfEndwithSlash = (st: string) => {
    const len = st.length;
    const end = st.substring(len - 1, len)
    const regex = new RegExp(/\//)
    return regex.test(end)
}

export const removeLastSlash = (st: string) => {
    const len = st.length;
    return st.substring(0, len - 1);
}

export const matchTest = (str1: string, str2: string) => {
    let string1 = str1;
    let string2 = str2;

    const str1endswithslash = checkIfEndwithSlash(string1)
    const str2endswithslash = checkIfEndwithSlash(string2)

    if (str1endswithslash) {
        string1 = removeLastSlash(string1)
    }
    if (str2endswithslash) {
        string2 = removeLastSlash(string2)
    }

    const testpath = `^${string1}$`

    const regex = new RegExp(testpath, "gi");

    return regex.test(string2);
}


export const makeRequest = async (url: string, method: string, extra_headers: Object, data: Object, params: Object = {}) => {

    const options: any = {
        method: method,
        url: url,
        headers: {
            // 'Content-Type': 'application/json',
            ...extra_headers
        },
        data: data,
        params: params
    };

    return await axios.request(options).then(response => {
        return {
            "success": response.data
        }
    }).catch(function (error) {
        return {
            "error": error
        }
    });
}

export interface RequestProps {
    url: string, method: string, extra_headers?: any, data?: Object, params?: Object
}

export const makeRequestOne = async ({ url, method, extra_headers, data, params }: RequestProps) => {
    const options: AxiosRequestConfig = {
        method: method,
        url: url,
        headers: {
            ...extra_headers
        },
        data: data,
        params: params
    };

    return await axios.request(options)
}


export const modalOptions = (theme: MantineTheme) => {
    return {
        radius: theme?.radius?.lg,
        sx: {
            ".mantine-Modal-modal": {
                background: getTheme(theme) ? BLUE_DARK_COLOR : theme.colors.gray[0],
            }
        },
        overlayOpacity: 0.7,
        overlayBlur: 0.7,
    }
}


export const createImageURl = (file: File) => {
    return URL.createObjectURL(file);
}


export const toDate = (datestring: string, full = false) => {
    if (full) {
        return `${new Date(datestring).toDateString()} (${new Date(datestring).toLocaleTimeString()})`
    }
    return new Date(datestring).toDateString()
}

export const limitChars = (word: any, limit: number) => {
    if (word?.length <= limit) {
        return word;
    }
    return word?.substring(0, limit) + "...";
}


export const alertModalOptions = {
    radius: "lg",
    size: "md",
    centered: true,
    padding: 0,
    styles: {
        header: {
            display: "None"
        }
    },
}