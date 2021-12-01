import React, {useState, useEffect} from 'react';
import { User } from '../Models/User';
import dataService from '../services/data.service';
import styles from '../Styles/createUser.module.scss';

function ClientList() {
    const [clients, setClients] = useState<User[]>([]);

    useEffect(() => {
        dataService.getClients().then((response: any) => {
            setClients(response.data);
        });
    }, [])
    return (
        <div>
            <h4>List of Clients</h4>
            <ul>
                {clients && clients.map((client) => (
                    <li className={styles.card}>
                        {client.firstName}, {client.lastName}
                        {client.email}, {client.userId}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ClientList
