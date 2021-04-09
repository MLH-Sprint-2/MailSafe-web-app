import React, { useState }  from 'react';

import './Aliases.css';

import { getDomainAliases, deleteDomainAlias } from '../../api/mailSafe';

const Aliases: React.VFC<{ token: string, email: string }> = ( { token, email }) => {
    const [aliases, setAliases] = useState([]);

    const [loading, setLoading] = useState(false);
    const [firstLoad, setFirstLoad] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const getAliases = async () => {
        try {
            setErrorMessage("");
            setLoading(true);
            setAliases([]);
            const aliases = await getDomainAliases("swiftmegaminds.tech", token);
            console.log(aliases);
            const accountAliases = aliases.filter( (element: any) => element.recipients[0].includes(email) )
            if (aliases) setAliases(accountAliases);
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
        deleteDomainAlias(domain, id, token);
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
            {/* <form onSubmit={handleSubmit}>
                <select 
                    value={domain}
                    onChange={ e => setDomain(e.target.value)}
                    >
                    { domains.map( domain => <option key={domain} value={domain}>{domain}</option>)}
                </select>
                <br />
                
                <input type="submit" value="Search"></input>
            </form> */}

            <p className="alias-title">Your aliases</p>

            { aliases.length !== 0 && (
                <table className="aliases-table">
                    <thead>
                        <tr>
                            <td>Alias</td>
                            <td>Recipient</td>
                            <td>Delete</td>
                        </tr>
                    </thead>
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

            <button className="alias-reload" type="button" onClick={getAliases}>Load</button>

            {message}
        </div>
    )
}

export default Aliases;