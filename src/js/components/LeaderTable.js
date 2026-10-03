import '@/scss/components/_leaderTable.scss'

const LS_KEY = 'ls-leader-table'

/**
 * @typedef {{ movesCount: number, timeStamp: number }} LeaderRow
 */

/**
 * LeadersTable — renders a top-10 leaderboard from localStorage.
 */
export class LeadersTable {
    /** @type {LeaderRow[]} */
    #data

    /** @type {HTMLTableElement | undefined} */
    #element

    constructor() {
        const raw = localStorage.getItem(LS_KEY)
        this.#data = raw ? JSON.parse(raw) : []
        this.#render()
    }

    /**
     * Renders the whole table (header + body)
     * @returns {void}
     */
    #render() {
        this.#element = document.createElement('table');
        this.#element.classList.add('leader-table');

        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');

        const headers = ['Место', 'Ходы', 'Дата'];
        for (const text of headers) {
            const th = document.createElement('th');
            th.textContent = text;
            headerRow.append(th);
        }
        thead.append(headerRow);

        const tbody = document.createElement('tbody');

        if (this.#data.length === 0) {
            const tr = document.createElement('tr');
            const td = document.createElement('td');
            td.colSpan = 3;
            td.textContent = 'Пока нет результатов';
            tr.append(td);
            tbody.append(tr);
        } else {
            const top = [...this.#data]
                .sort((a, b) => a.movesCount - b.movesCount)
                .slice(0, 10);

            top.forEach((row, index) => {
                const tr = document.createElement('tr');

                const rowData = [
                    index + 1,
                    row.movesCount,
                    new Date(row.timeStamp).toLocaleString('ru-RU', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                    }),
                ];
                for (const text of rowData) {
                    const td = document.createElement('td');
                    td.textContent = text;
                    tr.append(td);
                }
                tbody.append(tr);
            });
        }

        this.#element.append(thead, tbody);
    }

    /**
     * Returns the (re-rendered) table element
     * @returns {HTMLTableElement}
     */
    get element() {
        this.#render()
        return this.#element
    }

    /**
     * @returns {number} number of stored rows
     */
    get tableSize() {
        return this.#data.length
    }

    /**
     * Adds a new result and persists it to localStorage
     * @param {number} movesCount
     * @returns {void}
     */
    pushResult(movesCount) {
        /** @type {LeaderRow} */
        const dataRow = {
            movesCount,
            timeStamp: Date.now(),
        }
        this.#data.push(dataRow)
        localStorage.setItem(LS_KEY, JSON.stringify(this.#data));
    }
}