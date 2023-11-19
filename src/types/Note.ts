
interface Note {
    dateWritten: Date;
    name: NamedPerson;
    note: String;
}


interface NoteCollection {
    patientId: Number;
    notes: Note[];

}