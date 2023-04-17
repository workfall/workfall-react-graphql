import { FunctionComponent } from "react";
import styles from '../styles/Table.module.css';

interface TableProps {
    columns: TableColumn[];
    data: Record<string, any>[];
}

export interface TableColumn {
    label: string;
    key: string | string[];
    keyIndex: string;
}

const prepareData = (data: Record<string, any>[] | string[]) => {
    if (typeof data[0] === "string") {
        return data.map((item) => ({ id: item, name: item }));
    }
    return data;
};

const getNestedValue = (obj: Record<string, any>, key: string | string[]): any => {
    if (typeof key === 'string') {
        return obj[key];
    }

    return key.reduce((accumulator, currentKey) => {
        return accumulator ? accumulator[currentKey] : undefined;
    }, obj);
};

const Table: FunctionComponent<TableProps> = ({ columns, data }) => {
    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    {columns.map((column) => (
                        <th key={typeof column.key === 'string' ? column.key : column.key.join('-')} className={styles.th}>{column.label}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, index) => (
                    <tr key={index} className={styles.tr}>
                        {columns.map((column) => (
                            <td key={`${typeof column.key === 'string' ? column.key : column.key.join('-')}-${index}`} className={styles.td}>{getNestedValue(row, column.key)}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Table;
