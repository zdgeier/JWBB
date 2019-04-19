import React, {Component} from 'react';
import withStyles from "@material-ui/core/es/styles/withStyles";
import ImageFadeIn from 'react-image-fade-in'

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

let style = {
    root: {
        display: "flex",
        flexWrap: "wrap",
        height: '100%',
        width: '100%'
    },
    quadrant: {
        display: "flex",
        width: "50%",
        height: '50%'
    },
    photos: {
        height: '100%',
        width: '100%',
        filter: "grayscale(100%);",
        "&:hover": {
            backgroundColor: "white",
        }
    }
};

class About extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {classes} = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.quadrant}>
                    <ImageFadeIn opacityTransition={4}
                        className={classes.photos}
                        src={"https://wpmisc.com/sites/default/files/wallpaper/animals/66789/weimaraner-dog-hd-wallpapers-66789-2814574.png"}/>
                </div>
                <div className={classes.quadrant}>
                    <ImageFadeIn opacityTransition={7}
                        className={classes.photos}
                        src={"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUSEhIVFhUVGBUXFxUVFhUVFRUVFhcWFhUVFRUYHSggGBolGxUVITEhJSkrLi4uFx8zODMsNygtLi0BCgoKDg0OGxAQGi0fIB0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIALcBEwMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAEBQMGAAIHAQj/xAA6EAABAwMDAgUCBAUDAwUAAAABAAIRAwQhBRIxBkETIlFhgXGRBxQysSNCocHwFVJictHxFjOCsuH/xAAZAQADAQEBAAAAAAAAAAAAAAABAgMABAX/xAAmEQACAgIDAAEDBQEAAAAAAAAAAQIRITEDEkEiE1FhMlJxgZFC/9oADAMBAAIRAxEAPwCn6bULHAyugaXU3N59wqBVoFpVm0C/gBp7Lti/DnkvRlqtUtyCnGi3UsB9kq1ZoLJC10K7lgHojVoW6ZZKdwCUNq5xhLrGsd3yml4JakaHUrIbX9IWz2hCW9ccKdjpQMiSjUEpoHghJqjR2U1KusEnfIPsta4nKk8YKGqZGEoTWhWjCdUfM1Vq1qeeCrNbuG1ZmF95p8yQeUqoAsKsVSqeEtuaPdazDDT7ncIKR9Us2tL28hEUKxaYRN1Q8RmUKsKdFAt9QLjynopu2yEnu9GNKrj9JMq16bSlkFc8o0Xi7Qr0/WSXbDyFLeUd5kqepYNY/fC9uK7Rx2U44dDPINRsNrpCZinuQFK+BMd00YIC3YFGtSykINtmQcJmyr3KnbEYRSTGtCO6sjCU0aRa/nurPcPkwFHVsRErUvAYAbis0NlKKOqndHARtzS3eVeDRhEwh1GsYWN60xlPrfaVT22Lhx8J5pVVzRDkuUTCtWbAQlpjMYRN7UDsL2kwbU1WN19IHPyvVG6kViNAKDWpg9lLaUxIXujkVaQd3C1rN2nC9HRxFj8HcyF5pNqGSoNOvJastKhL3CcSmFCKdQNqFF3FwdspbcMh6aUaU0ylehlsU2NWSR7pq1phVi1uNtZ7fQ4+itFs+WpawFbA3XMGCUQKndKLkkv+UztHghAIfSbKmqsgIQGOEdTrCMoDCC5qbHynenXocBlKtTYHFe2NPZ3QAi0U8r2tRwobJ8j6I1lQRCDGEleAUxtnAhLdWYZkLXR7ycFYwZe2IfmFBbtg7U7poSpbw8H/ADupyKRIL6x3NVQ/L7XFrvXBXQ9shUfrWwqBu6nMjOFFq0OnTJLPSwTIKbfljGFXum7yqWDe2CrLbXHqpoLog8IzEqY4C9qv9FG2kT3wnQAcvz/dF1q/l5WGh6LT8uJgrBBKQEz3R1KsOJC0rUABKUPrOa/ARoI5cGhSjbGEE2rIUrStJGr03cwDheGsQpJgQvGNBQwC2LX3hkrEU61BPCxajHLOl7/Y51Mp1XbuVY1Cl4VbcOCrTZ0y5gcF6KyjjljJFbViwpjplQl5SmuYKY6PXAefeEUAsX5Pc5OrezimQlNK/DUdaalvkBK7aCqTKDqDNt474VrtTDIVd6ppbKzXjvM/EI7R7ouwUPA0EvtySSspUyCn1G3BCA1KjtBKFhoHo1vNkoqrVEcqpVr8k4RFvVfEuctQRs50lamqQYSx97mAcpvZWJw6rIETHc/U9lmlQFdjbS7gmI5TmlbOPEfSVXjqm3DGYE8R29P93picha23VbWvAd27jBHGfocfcJKkNgtFTSnOEuEAfcoGtYUaWWtM+sn69k7pamyq0taZ445yB/Yz8qtajcS7a04HJJ5OCftx8FLG28hdJBrb4D0H+Qof9couqBk59e0gH/uqB1br5Y3bTMfTknE/ZUaz1CpvDtxmZBnGTymcUjJn0PbVweCvL0NIMqk6Fr3iU2umHjESJPp9THZWay1FtYbDh4+x+ijODQ8ZJgtu1m6Gre4bt4UNagKRLtw+6io39Oq6A8E+gU6HDKWVIwEKL8ttyFG9z5wFqMMGEDlaVPMZBQrqshaU6pCwQw0NwSyuwMd5kR+bLZJ7pTe3m9yNBQ8tqrIxC9rURyFWmU3jKZUL8xtIRbYtBPil2EUxm0Z5UVlUbypfzLXSJCUJIKrViDezPKxYxybVIqU57qbp3XwB4bvogbZ8y08FIb9ppVNw9V3OXXJyqN4OhXdOc+qj0sHxR6KPp+6FamATlN6duGuHqqE9YHNzTbAW9I7GyFFStCYJRtNg4QMVW9uTUqefEHCnoM2EEIPqCkW1QR7qAaw1gyUuENTZdbfVGtbkqqdS9RVHHYwfKUW+pl7/AGTrfSDC+AY+6WkU1sptfUH0znkqSlrT3Y3Qj9Q8GueI+iM07S7Vjd3J9CkaZRNBPS/Lq1ThjSQOxcEsuetqlWrE7QSBHYTg/wCe6dMudtB4a2TUBZTYATM/zQBx2ErmF3QfTqEOBBHqCD9ilTayaVPB0Ow6idVgkDA+CJmfvKd2Bp1nOcTj35GZA9+VzLS7nhmckDHvhdQ0XSQym01JyJHeCSSHbeTHl/qrqSog4Oy7aLZhhJAlwaQAPeRj5B/okutUTHBHOB7cmP8AOfvbtApR2ORmRGTk/wBVvqel7mmG57ECSAefuo96kU64PnvqS3eHwQe0f59kBY2xJ/znnj4XWuptGLmuaWebs8tk5iI98KhaPRqW9RwqsyJye/lMQTg5jHPoncryCKrA80qwrFopW9N76gEuP8MBriNwa59UFu/aZ2AHEExIlfT1G4o1fDrBzSIltVrW1GtOA9rmHbUbJiR68KGp+Y8W3rUapmm4Hww4+YkkuceB/E80kifN3jF86xZSufCc5gIY07qj5Ba1wBIYHeYvIEYGJM+8pcjeaKLjS9K865M54PqZAP8AdG6TaNNTcRB9W4VerVmup7JMGQHehGBPvMff4SvT+qqtF2x0EDGeUe3aNIHWmdjdUG1QW1dpEJV07qIuwNhg9xKtdtocDzFQSY7Ed40ZIQ9GSJKJ1W3c1+2cLbYNqMqNEXXLpBASOkxwen7qMShTTEoodG1GqIytKvOF7t9FM21dyUGBngpuhC0aTg6U4Y9oGVDVeEDHgB78rEK6v7LEKMcxLIyOUv1W33t3Kw7GlqWOGHNXe1ao5Uxf0jqBp1Q0nBK6i4AlruxXFa8sqSOxldB6c6ha9jWuOcIcU8dX4Dlj6josjbhRtEGVBbVJaiiEwpR+tLvaRCpLCXuklW3rsjcFSRcbThQk8nRBYHlvcNYCO6ltA8yS6GlV19wXOGYT6kwlrROByt2Go1LnA8T7gJtbV4aZGAJjuTzCXOrROZjv3Q1W7OwtE7iDgc57Y+Fpv4girZJ05pD9VvDSfW8KlTaXvdyGtaQIbMAuJPJ7AnshdaZRNcso161xRZP8Wo0B+OS0zL2YETB5gJnoNnRFMOp3FFji14qeKXtdLmeG4MDWmZBqfDo+uWpo0N7KTi8uI3vLWtEtnaGtyZyck95gdpq3hFHGKy2BWGmfx2BoDtpHAxjJB913bpTQyQK1YZIEDtER9lUfw96adUrF7x/Dp8k/zPOS2e/OSui6jqjWeRpAjn0CaT8Qlejdr2gQIC1N231CoGpdWUaZzUk/VI//AF3Re6BKy4ZMT6kTrFehTqiHAH3VK6g6QHmf+poBxBJPxMf3QOn9WNDhtqD/AKScf/ivmj6oy4ZI+hCX5Q2Nh6OBa7pLomkxxYCQZB3NzwT3b7oCw8Rroc47SOHHj65XbOsdCO01aUiJlre65Lf6S0u308EZLDgifSe0qikmBobWVmypSc3gCSMjv29lQ+pKG2s4cEQc9wRmfeZV70artbE59OY+pVe680+WtuKfLJDxkkNPc+wP/wBlJrpL+R0+yA+jNZdQrNdJic5I/qF9EabrDKlMODpkD0Xy5YPnI+R2XQekdbLRtnHp6H2T0mKzo2rU3PqbgoiIGVBpuq7yBCaX1AFshLOFAhLwRXNUZSt9bKMuWmYjlCV7VzRJSJlTeyvRMHlG3WoANwJKrpHmlSeP2WoxKytUcU0tCRyhrFwTEkIGNTRBysWhLuxXqBjmdN0IWvU82FEyvKmNOcrvs5qor2sU4dKDoVi0gg90+1emHNkKurnmqkVWUdk6Tvi+kJ9lZC4RMrn/AEZc+T4Vh1K8cKZj0XU9Wc1ZKP1veTWIB4VYc6Ubqry55JQlBklcjyzqWEEWFvudPomjLiXAdhhRUCGNK306kHEvcPK2T9T2CasUZbJtVumgBjB9fcrTQrbxa7QTAacn6ZMf53SmrWO8vPvCbdFVC6qWmSGw4RyCZzKWWjR2Dagx1Kq9jexIBgTHxjhOujbUF+6N2wgCch1U/p+3PwhNfptfVJnMkQM+8T89lbPw00/xLilSAxTJqPPaRBj77R90F8Rqs6xVLbCxc4/yMLnH1MSV89a/1vcVnHa4tBM/VfQXX1q6rY16beTTcB9YXyxVt3z+kpVuweE/+ovd+okozTBIee4CX1LUsaC7k9kTpd6KVQbstPKpb9BQD+afu3bjM+q7h+FOu+Jtb3iHe5C51caPaVAKjHxPaV038O9Op0duweUDJ9z3RcWkBStnVBkQVz3rLposcazXAMmXEgmB6AAK+21SVtdUw5pBiCO+QpaGTOEXNMNPkqsPt5mzjsXCEDqtSWkOmC0/OOQQc/CuPUtmxrnNLKbsy0BppPgZ/hObIcRnHJ9FSjQn/wBpxdTJ8wOC36gY/wDkFpOxoqii2VxtJHvg/wBirPodwzfJcAD290h161DapAEIzRLKHtecxCpTuhE1R1zR6YABTWtqcYKS6Zdbmj6Ix5G4Spzk7oMYIJF205kJbq11uG1v3Ut8AAOJQ/ISoc9bYgN57JQ8ycCfojqtdxIZOE/0zSqbWgmFrAVfxnM5TG0uZ5W+vU2cCEoo1Q3CF2YsfiNXiS+P7rFrMcuY/aUT+eACiFLsUMWAHK622iCya1romQldTlMq1ZkQEucJKlLI6L70OQWKz3DmlhHsqj0Y+GJ0+6hjl1L9JztfIpep0fOQgg3MI+6O5xKGrANXO0dNkteYARdSvspBvEpea3EI3VqZNFpHY/0QCJr85xxCY9KVCHvggYBk+xP354SqseJ/8ozQ6Re92Ya1pmOfoPUlIzLZZbN4fVinSdWqGdo/Sxo/3OAP7ldo/D6wNOm5zm0wSYHhhsADgS3k/JXB9Pr1KlRlFkMbJMfygNBc57zy+A2ZJ7dl3ToC9Z4Qp0zua0ASTJkczGPgcIMfwtdzlpB4XCPxG0N1s81aAljiSRH6SfRdzuX4KqGuUmvaWOE47rR2L4fOVVznmXLNhdwrl1FpDG/oCrtezLII9U7i0KnZ5pdlUe4ATErt3StQU6IaOQub6FT2ZPdXjSr8CMcpqpBR0rR6kt90zecFV/RroQD2TC91OmymXFwj6jJ9ApSNRy3r6u9tVxYQafla7aZLSM+dvbtDhBx8Kr1LptJxrNxLC5zT/uMhw9wS0mO27si+ob59G5eXw6jU2uaRJ8jpZUBGQS0ifhVLWKuyn4R/3OEj0DjBHsQgkPLAovrje8vzDjOeR7L1t48QAYA9EHC3lPZM6l0Rf7mhufclWq5cPT5XNvw/eXVQ1zyAOy6tVsfIlkMLqQD8DBC8rWzmrTTm7ahlM726aAluxkJb6kQNzeUEzW6v6U0qVQ4FKzYkmQhVm0Q1aziJJMrS1oeI7KMdb4yoaLS12CskgjFtvGFiEdJPJWI9QWc/vG7HkFJNQdnCsXWFCDI+qq7ZK6JvwhDVkOwrdlNGU6Kl8EJOo1j3pFuEy1FsAhB9IRJR2pjzFdNfEjfyKu4+ZBXzpci7w7XFL3eZygywYyAAnRuf4RbGCIykcSQE0rxsjlDwoit3jYdAdK9tLk03gg8H7zyVrct8yi2pBPSw3bhTa5zDmqxwBHYQC+PiR91Y/wAPOonWpbTkgRveSZgESGtb2xHy5ULxyNgOQAcf9RM/0KK/MHzepayD9NoP9BHwsNeT6cq6u3Y14y1wGR7pBf1DULi3jtH7rilp1be0WbGvJpiBDhIHoJ7K0/h/1Xc131rd21xdSc5hAghwLRHpw4n4SNuOR4qLwWWrplI/rIAHJKqPVn5anTcKZl2CCpXW1d9FznuPlLpB53BwbtP3n4Suvp5dSPrBVIS7lZcHRWM+mupLc0xTrMgxh23dJH6RjK6BolCm9gho3ciMgAnEhcb0Wz3Fh+n9Of2K7Z00wCADggA49sn6cIqOLMo4yKuiuqfzlV1E0tpa44n0JBEfZItasrlmsVLZ9QCi5orM3vhjKE+cx/uGx7fiV7ptrUtuoK1OiAGOf4hkHLKrWvJbn/c8juvPxka5+p29NoJ/gs3CJ3MdUeSDxI8sQfWO654X3djTVJNfYTaq9lZ7w0BrGtYWtaCAGRuAHuQZPufhU3VL7xHc4gR9s/1lXu46arGiHUm7Q7uAchuARuyBAHuqw/o+4yds8mFbskjlabZXmiOeF7AR9SyeDDmkEQOPZQ17Mhod2/usai0/h1ZvdXDhwOV27w5ZC5l+G+hvDBXzteIwfQrptEwIS3k0iqXVMsqH0UzrcPRGskTJWlKuNsg9kGqZk8AVS12hTWFy0+VZQqbiZS+6obHbx6pWh4sOv7TEt4S+2pEHPKZjUWFscoS5rgCYRWjSwYaR9F6h/wDUGrERBF1NYB1LcOwXNn1NphdQp1d9MtPouba1allQ47rp5fuc/E/CIXi8N2ULC9a1StlSwdMXpFSPVWfUqgBVL0QRUTzUqx3fCvCXxJyjkC1pndKGvTuqw1GwklxRLTBU5bsotEjJc4JvUPlhvYJVbOARtO7AwgOhVcicoZzk4qsYQRwUrfR9DKQDIiVLQfBzkcKKFvTpuJAAyVgDe1quEkTsOHQS0SMtgg8gx/Ud0x6U1B1vfUXPADakUi9rQ2WPc0BwAwHAhsj0XRujNHFO0ayowebLg4AlxPaPRU7qjSTa1ywR4dU72CJ2PH6S0EGHA/cO+QJftKw3Zf6lgxniB24t8RxBwDBDZJjmMpNUswHkEDaTiOCCfTsnnT1wbq0puMGoAGvgz5gASZjnI+6Idp7QcjhDhj1PQbtFEs9EdSe9pja18sM8tfkfZ0j7K76US1onEfB+iE1ukQ0OYBggEHuxxAcPtn4WtpbPcQ0Ek9/ZXvr/AGTUeyr7Fm0mypVKza7mzUaNviDDtsyGGOQDnPqub34fUua1WpUZWL3up0XcvZRa+p5Ow/ljEkecHmF1C0bTt43u8zhDWyAXQOGjuVVOn+nC+6qPdTfTpiHhr9zSC8yRIMkyHSZz8qE6/wBJcm7LJTtGso02GZDGiM4wJUdvaNJyEyvXSf2UFu2ZU5PJBAd703ReTuYPMOY79j9Vy2/6Xc24q24b+qXs+kSYXbLcOALXDjLT6hKaVo2peOeR+hoAPvJ3D7QimayLQ9LFvZto8EDcPnJU1GtIRPVZDabS0wW9vYpBpl3OFVR+JJyyD6/budwl2kMIEOKtNelIVbvLV7XEt4SDIBubgtqQOJUt3uLDHdb/AOm7slFU6cCClQSu29NzTklbXNc8eiZVaE9kJc20ZTBFUu9V6izTWLZDSFllcGUr6qtJ84CJo1YTC4aKlEyu1q0caw7OewsZTlS1qR3kD1TCz0snJXOotlrS2Q6TSPiDCf3tAYJ9FLp7abeeUNq9Qk4VlHqhO1vBmnASlevU/NhMNKZLuVB1HS2lCX6QrYhZhe7u60qFYSoDk+7efqsdZEztMwoA7ai7OttcDujssMa21AwXHgcz+ytfR9Kn4o/hglo3OceGgfuZIAC1odMVX021iIplwgd3SeVb+mNMaHuwAASD9MLfgZIuVizyhxGSMD0CWdRaKLpsH9bDLHbtu1wjv8fsmNvciXzjho/YAfXn5Uja4GAJ2/uojayc86Y03UKV0KFMODXkF0/oDAfM4fsYnt7LoF3cBpio5oeID2zlpj09+yNo3GwirAwHGO8AS4D3gf0Rep2FpXLLx4G6m0ubVBjyEEw4j9TckwU6k7Kw5eu8oQtqUHy1x5HfCynqlrbDdUe0R3kR8qkv6mqPbc1fDL7dry1j8NIbMST37Kst09+oVnUqRdDWOe0cyfQ+kldNKrNLmTtJHY9MoVbi6p3UsNvtJpyPOJAgj07qy6hWEkDkNaY9iXR+xVC/C7Rr61ol9xUijDj4Twd7COYd2GOFY7G98ercuHBbR29vLDj+5J+VyttsSbuvwiN90SchF028FL3A7od90xoMJhvypt2wDUxH0WtCgBJAyV6xuIPPCmBiFREmUnq26O/aRwIlJLBxDpTPq538QmfhV9t8B9V0RWCMnku1BwIW35cFLNIryE0Dkko+jxlYrv7Yt44QG8DkqzV2BzVUL6kTV29lKcayUhK8EVy4k4+FC87h7901/K7RlKtRluWpUxmgTwvdYgjeL1OArocj7S5xtQLRJRFK28wMrtijlehHft2VCYRVC+MQi+p7IABwVWN2Rwk7dXQyXZD5lYNMkqSq7cqs6u4nlWGyJ2Aod+wyVG1N5a5R65ULoWOMle6hT8qz0asip9GWyoGNyjKZwoKwgqY1HtWlOVCOUYw+VCvas0Y+humKTKtpRB42AgfHKhfppo1pH6DyPrgrkuj9b1reo0g+UBjdv/FnYf1XW9L6ho3zDsdkCfcSllH/AKQ8ZeMT9T6g+1LfJNJ/84/kPY/BWaN1BTed7iP+UcGOSPfjCe3dMPpFtQSOPp7qpV+nWtnbgHnb3H0UmUSLndXe17HggsH2+n2KrbdXFlcC0qNNS1Pm2nJFJ/6YH8waZBHot7Kwq7BTEmnLdp5c2OJ7kf8AdH9QdMtvKIbOyrT/AEVByPUGOyK2C6wbi+0Oo6pTLqYkAOYSWsM+jcCVvpR0fTDUqUajQ7YCRv3EtGQGgn9lyLXOkdQpOO+i6pz56fnB98ZS+hoN6S0Ntq3nGPIR954+VROIrbO2jrQ3JqbGbbcsABdhznGZx2EJp0vbnw31HY8R0gejWiGqqdE9CVaYDrupIEEURxP/ADPf6LpVJgjj6D2Qm09CrCAX2kulMKNLaFtClYJykoNmgS/UryBjlNXFV3qK/Yxp9SnihGyp6kC+qSUl1CnmAnRcXtnul1SgckqxMP0m6DAASrLa1A5srn7ah3DsrRY3QDQJR2gLDHQrRhK7+mA7cva1WeERaWxfyp9cUx7p2iLwHVAIwix06HNgym1rSDVteXwYEkeMaXIVV/RdOeT914jX6s6Tleq/0yX1Wcc8SOFLSrmVixOZoLuh4jCFQ7ylteQvViTlDxg6sVgfIFixJDY7Cm08hTavbQwFeLFR6F9FNGn5ZUNelPCxYp0OeNG0IcuWLEGY1dRkSi9C1mravLmHkFpHYhYsQ0Zl96Q66Lz4FfJP6XRPwVfrdrXjc3g9lixaSTVjRbJ6JczLYE4mOyykCJgxPflerFMYMpEgZOfVGUciSsWLChMiAAp2lYsRAetUrSvVixmLNd1RtCmT37Lm1ze1K7i5xx+yxYqxWCcgmwuduD9CpLnPCxYnFQivfK5a/m3DErxYsYf6HXJgOV1tngNWLEAkdWqVWdfv3ggLFipESRFTuWkCVixYsaj/2Q=="}
                    />
                </div>
                <div className={classes.quadrant}>
                    <ImageFadeIn opacityTransition={4}
                        className={classes.photos}
                        src={"http://4.bp.blogspot.com/-BkzYa4ueawY/UKVSoUAf78I/AAAAAAAAGzk/TFDxb6cEiS4/s1600/sad-dog-600x400.jpg"}/>
                </div>
                <div className={classes.quadrant}>
                    <ImageFadeIn opacityTransition={7}
                        className={classes.photos}
                        src={"http://clickwallpapers.com/1080p/black-dog-wallpaper-high-quality-resolution-On-Wallpaper-1080p-HD.jpg"}/>
                </div>
            </div>
        );
    }

}

export default withStyles(style)(About);