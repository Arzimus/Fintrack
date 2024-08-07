import Image from 'next/image'
import Link from 'next/link'


const HeaderLogo = () => {
  return (
    <div>
      <Link href='/'>
        <div className='items-center  flex'>
          <Image src='/logo.svg' height={28} width={28} alt='Logo' />
          <p className='font-semibold text-white text-2xl ml-2.5'>
            Fintrack
          </p>
        </div>
      </Link>
    </div>
  )
}

export default HeaderLogo
