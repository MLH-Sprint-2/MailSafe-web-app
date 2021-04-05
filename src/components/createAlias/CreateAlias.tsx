import React, { useState, useEffect } from 'react';

import { createDomainAlias } from '../../api/mailSafe';

const CreateAlias: React.VFC<{ domains: string[] }> = ( { domains }) => {
    const [domain, setDomain] = useState(domains[0]);

    const [alias, setAlias] = useState("");
    const [email, setEmail] = useState("");

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect( () => {
        setDomain(domains[0]);
    }, [domains]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (domain === "Loading") {
            setMessage("Domains are loading");
            return;
        }
        if (!alias || !domain || !email) {
            setMessage("You must fill all the fields!");
            return;
        }
        try {
            setLoading(true);
            setMessage("");
            await createDomainAlias(alias, email, domain);
            setMessage("Success!");
            setAlias("");
            setEmail("");
        } catch (error) {
            if (error?.response?.data?.message) setMessage(error.response.data.message);
            else if (error?.response?.status) setMessage(error.response.statusText);
            else setMessage(error.message);
        } finally {
            setLoading(false);
        }
    }

    let infoMessage = <></>;

    if (loading) {
        infoMessage = <p>Loading...</p>
    } else if (message) {
        infoMessage = <p>{message}</p>;
    }

    return (
        <div className="alias-container">
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Your new alias</span>
                    <br/>
                    <input 
                        type="text"
                        value={alias}
                        onChange={e => setAlias(e.target.value)}
                        />
                </label>
                <select 
                    value={domain}
                    onChange={ e => setDomain(e.target.value)}
                    >
                    { domains.map( domain => <option key={domain} value={domain}>{domain}</option>) }
                </select>
                <br />
                <label>
                    <span>Your email address</span>
                    <br />
                    <input 
                        type="text"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        />
                </label>
                
                <input type="submit" value="Create"></input>
            </form>
            { infoMessage }
        </div>
    )
}

export default CreateAlias;