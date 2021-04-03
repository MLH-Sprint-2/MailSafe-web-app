import axios from 'axios';

const base_uri = 'http://localhost:8000/api';
const version = 'v1';

const getFullPath = (resource: string) => {
    return `${base_uri}/${version}/${resource}`;
}

export const getDomainAliases = async (domain: string) => {
    const resource = `alias/${domain}`;

    try {
        const result = await axios.get(getFullPath(resource));
        return result.data;
    } catch (error) {
        console.error(error.message);
    }
}

export const deleteDomainAlias = async (domain: string, aliasId: string) => {
    const resource = `alias/${domain}/${aliasId}`;
    const result = await axios.delete(getFullPath(resource));
    return result.data;
}

export const createDomainAlias = async (alias: string, email: string, domain: string) => {
    const resource = `alias/${domain}`;
    const body = {
        name: alias,
        recipients: email,
        is_enabled: true
    }
    const result = await axios.post(getFullPath(resource), body);
    return result.data;
}

export const getDomains = async () => {
    const resource = 'domains';
    try {
        const result = await axios.get(getFullPath(resource));
        return result.data.domains;
    } catch (error) {
        console.error(error.message);
    }
}

