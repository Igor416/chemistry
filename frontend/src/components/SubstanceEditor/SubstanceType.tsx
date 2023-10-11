interface SubstanceTypeProps {
  isCovalent: boolean,
  setAsCovalent: (val: boolean) => void,
  isOrganic: boolean
}

export default function SubstanceType({isCovalent, setAsCovalent, isOrganic}: SubstanceTypeProps) {
  return <div className='d-flex align-items-center my-3 h4'>
    <span>Covalent Substance</span>
    <div onClick={() => setAsCovalent(!isCovalent || isOrganic)} style={{
      height: 'calc(2vw + 0.5rem)',
      width: 'calc(4vw + 0.5rem)'
    }} className='position-relative mx-3 p-1 bg-whitesmoke rounded-pill'>
      <div style={{
        aspectRatio: 1,
        width: '2vw',
        left: isCovalent ? '0.25rem' : 'calc(2vw + 0.5rem)'
      }} className='position-absolute rounded-circle transition bg-light-blue'></div>
    </div>
    <span>Ionic Substance</span>
  </div>
}