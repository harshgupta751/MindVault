import { Sidebar } from 'lucide-react'
import Card from '../Components/Card'

function Dashboard() {


  return (
    <>
    <div className='flex'>
        <div className='w-72'>
    <Sidebar></Sidebar>
    </div>
        <div></div>
      <Card id={"random"} type={'text'} title={'Competitive Programming'} thumbnailUrl='https://www.linkedin.com/posts/adityatyagiav_systemsprogramming-endianness-networking-activity-7315378508434743298-2omD?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFSgrw0Bv-8XqNf60O8SNITmZFOCI4uVWxw' content='<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:share:7315378507889397761?collapsed=1" height="264" width="504" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>' addedDate={'12/12/12'} tags={[]} ></Card>
       </div>
    </>
  )
}

export default Dashboard
