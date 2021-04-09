import React, { useState, useEffect } from 'react';

import './CreateAlias.css';

import { createDomainAlias } from '../../api/mailSafe';

const CreateAlias: React.VFC<{ domains: string[], token: string, email: string }> = ( { domains, token, email }) => {
    const [domain, setDomain] = useState(domains[0]);

    const [alias, setAlias] = useState("");

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
            await createDomainAlias(alias, email, domain, token);
            setMessage("Success!");
            setAlias("");
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
        <div className="create-alias-container">
            <form onSubmit={handleSubmit}>
                <label className="create-alias-name">
                    <span>Your new alias</span>
                    <br/>
                    <input 
                        type="text"
                        value={alias}
                        onChange={e => setAlias(e.target.value)}
                        />
                </label>
                <span className="create-alias-at">@</span>
                <select 
                    value={domain}
                    onChange={ e => setDomain(e.target.value)}
                    className="create-alias-domain"
                    >
                    { domains.map( domain => <option key={domain} value={domain}>{domain}</option>) }
                </select>
                <br />
                <p className="create-alias-email-title">Your e-mail address</p>
                <p className="create-alias-email">{email}</p>
                
                <input className="create-alias-submit" type="submit" value="Create"></input>
            </form>
            { infoMessage }
        </div>
    )
}

export default CreateAlias;