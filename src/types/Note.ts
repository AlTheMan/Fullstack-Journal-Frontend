
interface Note {
    dateWritten: Date;
    name: NamedPerson;
    note: string;
}


interface NoteCollection {
    patientId: Number;
    notes: Note[];

}