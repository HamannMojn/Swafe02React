import React, { useState, useEffect } from 'react';
import { User } from '../Models/User';
import dataService from '../services/data.service';
import styles from '../Styles/clientList.module.scss';

function ClientList() {
    const [clients, setClients] = useState<User[]>([]);

    useEffect(() => {
        dataService.getClients().then((response: any) => {
            setClients(response.data);
        });
    }, [])

    const listItems = clients.map((client) =>
        <tr>
            <td>{client.firstName}</td>
            <td>{client.lastName}</td>
            <td>{client.email}</td>
            <td>{client.userId}</td>
        </tr>)
    return (
        <div>
            <h4>List of Clients</h4>
            <table className={styles.table}>
                {listItems}
            </table>
        </div>
    )
}

export default ClientList
