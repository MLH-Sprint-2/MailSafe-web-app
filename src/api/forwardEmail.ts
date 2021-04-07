import axios from 'axios';

const base_uri = 'https://api.forwardemail.net';
const version = 'v1';
const auth = {
    username: process.env.REACT_APP_API_KEY || "API_KEY_NOT_SET",
    password: ""
}

const getFullPath = (resource: string) => {
    return `${base_uri}/${version}/${resource}`;
}

const isValidEmail = (email: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export const getDomainAliases = async (domain: string) => {
    if (!domain) throw new Error('Domain cannot be empty');

    const resource = `domains/${domain}/aliases`;
    try {
        const result = await axios.get(getFullPath(resource), { auth });
        return result.data.data.reduce( (accumulator: string[], element: any) => [...accumulator, element.name], []);
    } catch (error) {
        console.error(error.message);
    }
}

export const createDomainAlias = async (alias: string, email: string, domain: string) => {
    if (!alias) throw new Error('Alias cannot be empty');
    if (!email) throw new Error('Email cannott be empty');
    if (!domain) throw new Error('Domain cannot be empty');
    if (!isValidEmail(email)) throw new Error('Email must have a valid format');

    const resource = `domains/${domain}/aliases/`;

    const body = {
        name: alias,
        recipients: email,
        is_enabled: true
    }

    try {
        const result = await axios.post(getFullPath(resource), body, { auth });
        console.table(result);
    } catch (error) {
        console.error(error.message);
    }
}
