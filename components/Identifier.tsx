
interface IdentifierProps { 

    token : string,
    count : number

}
import { Badge } from "./ui/badge"

export const Identifiers: React.FC<IdentifierProps> = ({
  token,
  count
}) => {
    return <Badge className="font-bold relative z-20 bg-white m-2 text-black" >
     {token}     {count}
    </Badge>
}