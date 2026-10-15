const ContentArea = ({subTitle="", title="", description=""}) => {
  return (
    <>
        <p className="uppercase font-bold text-russian-dark-blue border-l-2 border-russian-red pl-2 text-sm">{subTitle}</p>
        <h1 className="heading">{title}</h1>
        <p>{description}</p>
    </>
  )
}

export default ContentArea
