import React from 'react'


import Card from "./Card"

function Band() {
  return (
<div className="flex flex-wrap bg-[#F5F2FF] mx-auto w-[100%] py-8 md:rounded-[15px] justify-center gap-4">
<Card borderColor='#C9B9FF' shadowType="small" src="/1.jpg" />
<Card borderColor='#9034E0' shadowType="large" src="/2.jpg" />
<Card borderColor='#301A79' shadowType="none" src="/3.jpg" />

</div>
  )
}

export default Band