import {FormEvent, useState} from "react";
import styles from '../styles/Room.ts'

type Props = {
    createRoom: (e: FormEvent<HTMLFormElement>, room: string) => void
}

export default function Room({createRoom}: Props){
    const [room, setRoom] = useState<string>('');

    return (
        <form style={styles.form} onSubmit={(e) => createRoom(e, room)}>
            <label style={styles.label} htmlFor="room">Create new/change Chatroom:</label>
            <input style={styles.input} type="text" name="room" id="room" value={room} onChange={(e) => setRoom(e.target.value)}/>
            <input style={styles.button}
                   onFocus={(e) => (e.target.style.borderColor = styles.inputFocused.borderColor)}
                   onBlur={(e) => (e.target.style.borderColor = "#ccc")}
                   type="submit" value="Submit"/>
        </form>
    )
}