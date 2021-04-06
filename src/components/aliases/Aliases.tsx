import React, { useEffect, useState }  from 'react';

import './Aliases.css';

import { getDomainAliases, deleteDomainAlias } from '../../api/mailSafe';

const Aliases: React.VFC<{ domains: string[] }> = ( { domains }) => {
    const [domain, setDomain] = useState(domains[0]);
    const [aliases, setAliases] = useState([]);

    const [loading, setLoading] = useState(false);
    const [firstLoad, setFirstLoad] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect( () => {
        setDomain(domains[0]);
    }, [domains]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (domain === "Loading") {
            setErrorMessage("Domains are loading");
            return;
        }
        if (!domain) {
            setErrorMessage("Domain must be set");
            return;
        }
        try {
            setErrorMessage("");
            setLoading(true);
            setAliases([]);
            const aliases = await getDomainAliases(domain);
            if (aliases) setAliases(aliases);
        } catch (error) {
            if (error?.response?.data?.message) setErrorMessage(error.response.data.message);
            else if (error?.response?.status) setErrorMessage(error.response.statusText);
            else setErrorMessage(error.message);
        } finally {
            setFirstLoad(true);
            setLoading(false);
        }
    }

    const deleteAlias = (domain: string, id: string) => {
        const newAlises = aliases.filter((element: any) => element.id !== id);
        setAliases(newAlises);
        deleteDomainAlias(domain, id);
    }

    let message = <></>;

    if (loading) {
        message = <p>Loading...</p>
    } else if (errorMessage) {
        message = <p>{errorMessage}</p>;
    } else if (firstLoad && aliases.length === 0) {
        message = <p>No aliases found</p>;
    }

    return (
        <div className="alias-container">
            <form onSubmit={handleSubmit}>
                <select 
                    value={domain}
                    onChange={ e => setDomain(e.target.value)}
                    >
                    { domains.map( domain => <option key={domain} value={domain}>{domain}</option>)}
                </select>
                <br />
                
                <input type="submit" value="Search"></input>
            </form>

            { aliases.length !== 0 && (
                <table className="aliases-table">
                    <tbody>
                        { aliases.map( (alias: any) => (
                            <tr key={alias.name} className="aliases-table-row">
                                <td>{alias.name}@{alias.domain}</td>
                                <td>{alias.recipients[0]}</td>
                                <td onClick={() => deleteAlias(alias.domain, alias.id)} className="aliases-delete">Delete</td>
                            </tr>)
                        )}
                    </tbody>
                </table>
            )}
            {message}
        </div>
    )
}

export default Aliases;