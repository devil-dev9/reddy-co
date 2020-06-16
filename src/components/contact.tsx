import React, { useState } from "react"
import { Send, Mail, Phone, MapPin, Loader } from "react-feather"

import { TextInput, Button } from "./ui"

import { beforeContactFormSubmit, contactFormSubmit } from "../../config"

import SocialLinks from "../utils/sociallinks"
import { ContactQuery_site_siteMetadata_contact } from "../pages/__generated__/ContactQuery"

type FeedbackState = { [id: number]: { message?: string, type?: string }}

const Form: React.FC<{ api: string }> = ({ api }) => {
    const [data, changeData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    })

    const [feedback, setFeedback] = useState<FeedbackState>({})

    const [ transactionState, setTransactionState] = useState(false);

    const updateData = v => changeData({ ...data, ...v })

    return (
        <form
            onSubmit={event => {
                event.preventDefault()
                setTransactionState(true);

                const validate = beforeContactFormSubmit(data);

                if (validate.result) {
                    setFeedback({});
                    contactFormSubmit(api, validate.data).then(res => {
                        if (res.result) {
                            setFeedback({
                                4: {
                                    type: "success",
                                    message:
                                        "Your message has been sent.",
                                },
                            })
                        } else {
                            setFeedback({
                                4: {
                                    message:
                                        "There was an error sending the message. Please try again.",
                                },
                            })
                        }
                        setTransactionState(false);
                    }).catch(err => {
                        setFeedback({
                            4: {
                                message:
                                    "There was an error sending the message. Please try again.",
                            },
                        })
                        setTransactionState(false);
                    })
                } else {
                    const errs = {}

                    validate.errors.forEach(err => {
                        errs[err.code] = { message: err.message }
                    })

                    setFeedback(errs)
                    setTransactionState(false);
                }
            }}
        >
            <TextInput
                label="Name"
                name="name"
                onChange={e =>
                    updateData({
                        name: e.target.value,
                    })
                }
                footer={
                    <FormMessage
                        show={feedback[1] !== undefined}
                        type="error"
                        message={feedback[1]?.message}
                    />
                }
            />
            <TextInput
                label="Email"
                name="email"
                type="email"
                onChange={e =>
                    updateData({
                        email: e.target.value,
                    })
                }
                footer={
                    <FormMessage
                        show={feedback[2] !== undefined}
                        type="error"
                        message={feedback[2]?.message}
                    />
                }
            />
            <TextInput
                label="Phone Number"
                name="phone"
                type="phone"
                onChange={e =>
                    updateData({
                        phone: e.target.value,
                    })
                }
                footer={
                    <FormMessage
                        show={feedback[5] !== undefined}
                        type="error"
                        message={feedback[5]?.message}
                    />
                }
            />
            <TextInput
                label="Message"
                name="message"
                type="textarea"
                onChange={e =>
                    updateData({
                        message: e.target.value,
                    })
                }
                footer={
                    <FormMessage
                        show={feedback[3] !== undefined}
                        type="error"
                        message={feedback[3]?.message}
                    />
                }
            />
            <div className="py-3 lg:p-4">
                <FormMessage
                    show={feedback[4] !== undefined}
                    type={feedback[4]?.type || "error"}
                    message={feedback[4]?.message}
                />

                <Button
                    type="button,submit"
                    title="Send"
                    disabled={transactionState}
                    iconRight={<IconRight spin={transactionState}/>}
                />
            </div>
        </form>
    )
}

const Description: React.FC<{ data: ContactQuery_site_siteMetadata_contact }> = ({ data }) => {
    return (
        <div>
            {data.description && (
                <p className="text-color-default">{data.description}</p>
            )}
            <ul className="my-4">
                {data.mail && (
                    <li className="flex items-center">
                        <span className="text-secondary icon">
                            <Mail />
                        </span>
                        <a className="ml-4" href={"mailto:" + data.mail}>
                            {data.mail}
                        </a>
                    </li>
                )}
                {data.phone && (
                    <li className="flex items-center mt-4">
                        <span className="mt-1 text-secondary icon">
                            <Phone />
                        </span>
                        <a className="whitespace-pre ml-4" href={"tel:" + data.phone}>
                            {data.phone}
                        </a>
                    </li>
                )}
                {data.address && (
                    <li className="flex items-start mt-4">
                        <span className="mt-1 text-secondary icon">
                            <MapPin />
                        </span>
                        <p className="whitespace-pre ml-4">{data.address}</p>
                    </li>
                )}
                {data.map && (
                    <li className="flex items-start mt-4">
                        <span className="mt-1 text-secondary icon">
                            <MapPin />
                        </span>
                        <p className="whitespace-pre ml-4"><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3808.300639273089!2d78.55580941487581!3d17.34926068810144!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb98ae366b2cdf%3A0x5a809a5fcddc3dbb!2sReddy%26CO.%20Events%20And%20Decorations!5e0!3m2!1sen!2sin!4v1592316514867!5m2!1sen!2sin" width="550" height="300"></iframe></p>
                    </li>
                )}
                <li>
                    <SocialLinks />
                </li>
            </ul>
        </div>
    )
}

const IconRight = ({ spin = false }) => {
    if(spin) {
        return (
            <span className="spin" style={{
                display: "inline-block",
                verticalAlign: "middle",
                animationDuration: "5s"
            }}>
                <Loader />
            </span>
        )
    }
    return <Send />
}

type FormMessageProps = { show: boolean, type: string, message: string }
const FormMessage: React.FC<FormMessageProps> = ({ show, type, message }) => {
    if (!show) return null
    return <p className={`text-${type} my-2`}>{message}</p>
}

export { Form, Description }
