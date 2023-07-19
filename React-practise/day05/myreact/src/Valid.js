import {Component} from "react"
import PropTypes from "prop-types"
// const ValidTwo = ({price = 99.9}) => {
//   return (
//     <>
//      {price.toFixed(1)}
//     </>
//   )
// }
class Valid extends Component {
  // static defaultProps = {
  //   price: 88.182
  // }
  render () {
    return (
      <>
       {this.props.price.toFixed(1)}
       {<this.props.ele></this.props.ele>}
      </>
    )
  }
}
Valid.propTypes = {
  price: PropTypes.number.isRequired,
  ele: PropTypes.elementType
}
// ValidTwo.propTypes = {
//   price: PropTypes.number
// }
// export default ValidTwo
export default Valid