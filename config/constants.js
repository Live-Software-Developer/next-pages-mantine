
export const DEFAULT_API_ROOT = 'http://127.0.0.1:8000/api'
// export const DEFAULT_API_ROOT = 'https://api.next-pages-mantine-template..supercodehive.com'

// export const DEFAULT_APP_URL = "http://localhost:3000"
export const DEFAULT_APP_URL = "https://next-pages-mantine-template.supercodehive.com"

export const APP_NAME = "Next JS Pages Mantine Template"
export const SEPARATOR = "|"

export const THEME_COOKIE_NAME = 'lsd-template-theme'
export const APP_KEY = 'LSD_TEMPLATE'

// App Colors
// export const BLUE_DARK_COLOR = 'rgb(36, 42, 73)'
// export const BLUE_BG_COLOR = "#d3d6e9"

export const BLUE_DARK_COLOR = '#131419'
export const BLUE_BG_COLOR = "#fff"

export const PRIMARY_SHADE = [
    "#F16135", // 1 -> Light
    "#F16335", // 0 -> Lighter
    "#E54813", // 2 -> Main Primary Color
    "#560000", // 3 -> Deep
    "#3F0000", // 4 -> Deeper
    "#F1613510", // 5 -> Light rgba 20
]


export const containerSize = "lg"

export const URLS = {
    // AUTH
    REGISTER: `${DEFAULT_API_ROOT}/account`,
    LOGIN: `${DEFAULT_API_ROOT}/auth/login`,
    REQUEST_PASSWORD_RESET: `${DEFAULT_API_ROOT}/auth/password-reset`,
    PASSWORD_RESET_CONFIRM: `${DEFAULT_API_ROOT}/auth/password-reset/confirm`,
    PASSWORD_RESET_VALIDATE_TOKEN: `${DEFAULT_API_ROOT}/auth/password-reset/validate-token`,

    // CONTACT
    CONTACT: `${DEFAULT_API_ROOT}/contact`,

    // BLOG
    BLOGS: `${DEFAULT_API_ROOT}/blogs`,
    BLOG_CATEGORIES: `${DEFAULT_API_ROOT}/blog-categories`,
    BLOG_TAGS: `${DEFAULT_API_ROOT}/blog-tags`,
    BLOG_REPLIES: `${DEFAULT_API_ROOT}/blog-replies`,

    // PROJECTS
    PROJECTS: `${DEFAULT_API_ROOT}/projects`,

    // SERVICES
    SERVICES: `${DEFAULT_API_ROOT}/services`,

    // HOSTING
    HOSTING: `${DEFAULT_API_ROOT}/hosting`,
    HOSTING_PLANS: `${DEFAULT_API_ROOT}/hosting/plans`,

    // USERS
    USERS: `${DEFAULT_API_ROOT}/account`,

    // MEDIA
    IMAGES: `${DEFAULT_API_ROOT}/images`,

}

export const EMOJIS = {
    "100": "💯",
    "1234": "🔢",
    "grinning": "😀",
    "grimacing": "😬",
    "grin": "😁",
    "joy": "😂",
    "rofl": "🤣",
    "partying": "🥳",
    "partypopper": "🎉",
    "smiley": "😃",
    "smile": "😄",
    "sweat_smile": "😅",
    "laughing": "😆",
    "innocent": "😇",
    "wink": "😉",
    "blush": "😊",
    "slightly_smiling_face": "🙂",
    "upside_down_face": "🙃",
    "relaxed": "☺️",
    "yum": "😋",
    "relieved": "😌",
    "heart_eyes": "😍",
    "kissing_heart": "😘",
    "kissing": "😗",
    "kissing_smiling_eyes": "😙",
    "kissing_closed_eyes": "😚",
    "stuck_out_tongue_winking_eye": "😜",
    "zany_face": "🤪",
    "raised_eyebrow": "🤨",
    "monocle_face": "🧐",
    "stuck_out_tongue_closed_eyes": "😝",
}

export const DEFAULT_MEDIA_PAGE_SIZE = 25

export const LINK_WEIGHT = 500