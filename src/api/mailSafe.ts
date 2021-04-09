import axios from 'axios';

const base_uri = 'http://localhost:8000/api';
const version = 'v1';

const getFullPath = (resource: string) => {
    return `${base_uri}/${version}/${resource}`;
}

const getConfig = (token: string) => {
    return {
        headers: {
            Authorization: `Token ${token}`
        }
    }
}

export const getDomainAliases = async (domain: string, token: string) => {
    const resource = `alias/${domain}`;

    const result = await axios.get(getFullPath(resource), getConfig(token));
    return result.data;
}

export const getDomains = async (token: string) => {
    const resource = 'domains';
    
    const result = await axios.get(getFullPath(resource), getConfig(token));
    return result.data.domains;
}

export const deleteDomainAlias = async (domain: string, aliasId: string, token: string) => {
    const resource = `alias/${domain}/${aliasId}`;
    const result = await axios.delete(getFullPath(resource), getConfig(token));
    return result.data;
}

export const createDomainAlias = async (alias: string, email: string, domain: string, token: string) => {
    const resource = `alias/${domain}`;
    const body = {
        name: alias,
        recipients: email,
        is_enabled: true
    }
    const result = await axios.post(getFullPath(resource), body, getConfig(token));
    return result.data;
}

export const getAccountAliases = async (token: string) => {
    const resource = `aliss/`;

    const result = await axios.get(getFullPath(resource), getConfig(token));
    return result.data;
}



export const login = async (username: string, password: string) => {
    const resource = 'auth/users/token/email/';
    const body = {
        username,
        password
    };
    const result = await axios.post(getFullPath(resource), body);
    return [result.data.token, result.data.user_id];
}

export const signup = async (email: string, username: string, password: string) => {
    const resource = 'auth/users/';
    const body = {
        email,
        username,
        password
    };
    await axios.post(getFullPath(resource), body);
}
