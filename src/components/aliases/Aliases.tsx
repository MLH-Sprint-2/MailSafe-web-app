import React, { useEffect, useState }  from 'react';

import './Aliases.css';

import { getDomainAliases, deleteDomainAlias } from '../../api/mailSafe';

const Aliases: React.VFC<{
    domains: string[],
    loading: boolean,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}> = ( { domains, loading, setLoading }) => {
    const [domain, setDomain] = useState(domains[0]);
    const [aliases, setAliases] = useState([]);

    useEffect( () => {
        setDomain(domains[0]);
    }, [domains]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (domain === "Loading") {
            alert("Domains are loading");
            return;
        }
        if (!domain) {
            alert("Domain must be set");
            return;
        }
        try {
            setLoading(true);
            setAliases([]);
            const aliases = await getDomainAliases(domain);
            if (aliases) setAliases(aliases);
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    }

    const deleteAlias = (domain: string, id: string) => {
        const newAlises = aliases.filter((element: any) => element.id !== id);
        setAliases(newAlises);
        deleteDomainAlias(domain, id);
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
            
            { aliases.length === 0 && loading === false && <p>No aliases found</p>}
        </div>
    )
}

export default Aliases;