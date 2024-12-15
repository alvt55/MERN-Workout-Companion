
import SessionsTable from './SessionsTable'


export default async function Page() {


    return(
    <>
    
    <Field label="Filter by focus" width={{ base: "80vw", md: "30vw" }} color="white" >
          <Input onChange={e => setSelectedDay(e.target.value)} type="text" required />
        </Field>
    <SessionsTable/>
    </>
    );
}