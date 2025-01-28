
const RadioButtons = ( { onSearch, onRated}) => {
  return (
	<div className="radio-block flex text-sm gap-x-4 mt-[13px] mb-5">
		<div className=" pt-[19px] pb-[10px] px-2 " >
			<label className="cursor-pointer radio-label" onClick={onSearch} >
				<input type="radio" name="category" className="real-radio" defaultChecked />
				<span className=" custom-radio"></span>
					Search
			</label>
		</div>
		<div className="pt-[19px] pb-[10px] px-2 " >
			<label className="cursor-pointer radio-label" onClick={onRated}>
				<input type="radio"  name="category" className="real-radio"/>
				<span className="custom-radio"></span>
					Rated
			</label>
		</div>
	</div>
  )
}

export default RadioButtons
