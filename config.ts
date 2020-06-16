const siteMetadata = {
    title: `Reddy & CO.`,
    siteUrl: `http://localhost`,
    capitalizeTitleOnHome: false,
    logo: `/images/logo.png`,
    icon: `/images/icon.png`,
    titleImage: `/images/wall.png`,
    ogImage: `/images/wall.png`,
    twoColumnWall: true,
    introTag: `EVENTS| DECORATORS | CATERING | PHOTO & VIDEO | AND HIRER`,
    description: ``,
    about:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    author: `@_akzhy`,
    blogItemsPerPage: 10,
    portfolioItemsPerPage: 10,
    darkmode: true,
    switchTheme: true,
    navLinks: [
        {
            name: "HOME",
            url: "/",
        },
        {
            name: "ABOUT",
            url: "/about",
        },
        {
            name: "OUR WORK",
            url: "/portfolio",
        },
        {
            name: "REACH US",
            url: "/contact",
        },
    ],
    footerLinks: [
        {
            name: "Powered Vy",
            url: "link goes here",
        }
    ],
    social: [
        {
            name: "Youtube",
            icon: "/images/Youtube.svg",
            url: "#",
        },
        {
            name: "Instagram",
            icon: "/images/Instagram.svg",
            url: "#",
        }
    ],
    contact: {
        // leave empty ('') or false to hide form
        api_url: "https://getform.io/f/cde5be38-04af-4e50-9ffc-35b172086c65",
        description: `Reddy & Co.`,
        mail: "reddyandc@gmail.com",
        phone: "944-007-2939 \n809-600-9966",
        address: "Central Bank Colony \nL.B Nagar \nHyderabad - 500074",
        map:`<p className="whitespace-pre ml-4"><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3808.300639273089!2d78.55580941487581!3d17.34926068810144!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb98ae366b2cdf%3A0x5a809a5fcddc3dbb!2sReddy%26CO.%20Events%20And%20Decorations!5e0!3m2!1sen!2sin!4v1592316514867!5m2!1sen!2sin" width="550" height="300"></iframe></p>`,
    },
    disqus: "elemental-netlify-com",
}

const beforeContactFormSubmit = data => {
    // Code 0 - success
    // Code 1 - Name
    // Code 2 - Email
    // Code 3 - Message
    // Code 4 - Other
    const errors = []

    if (data.name.trim().length < 2) {
        errors.push({
            code: 1,
            message: "Enter a name",
        })
    }

    if (!data.email.match(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/)) {
        errors.push({
            code: 2,
            message: "Enter a valid email address",
        })
    }

    if (data.message.trim().length < 15) {
        errors.push({
            code: 3,
            message: "Enter a message with atleast 15 characters",
        })
    }

    if (!data.phone.match(/^\d{10}$/)) {
        errors.push({
            code: 5,
            message: "Enter a valid phone number",
        })
    }
    if (errors.length > 0)
        return {
            result: false,
            errors: errors,
        }

    return {
        data: {
            name: data.name,
            email: data.email,
            message: data.message,
            phone: data.phone
        },
        result: true,
    }
}

const contactFormSubmit = async (api, data) => {
    let res: any = await fetch(api, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })

    res = await res.json()

    if (res.success) {
        return {
            result: true,
        }
    }
    return {
        result: false,
        ...res,
    }
}

const defaults = {
    disqus: null,
    twoColumnWall: true,
    darkmode: false,
    switchTheme: true,
    capitalizeTitleOnHome: true,
}

Object.keys(defaults).forEach(item => {
    if (siteMetadata[item] === undefined) {
        siteMetadata[item] = defaults[item]
    }
})

export { siteMetadata, beforeContactFormSubmit, contactFormSubmit }
