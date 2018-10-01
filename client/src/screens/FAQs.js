/**
 * Created by guy on 8/19/18.
 */
import React, {Component} from 'react'
import {
    Menu,
    Segment,
    Button,
    Form,
    Grid,
    Icon,
    Input,
    Label,
    Checkbox,
    TextArea,
    Select,
    Dimmer,
    Loader,
    List,
    Message,
    Header as SemanticHeader
} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {H1, H2} from "../components/Headers";
import Footer from "./Footer";
import Header from "./Header";
import {connect} from 'react-redux'
import BorderedButton from "../components/BorderedButton";
import Autocomplete from 'react-google-autocomplete';
import rest  from '../services/external/rest';
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Required from './Website'
import {t} from '../translations'

class Website extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <Header />
                <div style={{padding: 16}}>
                    <SemanticHeader dividing style={{marginTop: 12}}>FAQs</SemanticHeader>
                    <h5>Website URL</h5>
                    <List>
                        <List.Item as='a'>
                            <Icon name='help'/>
                            <List.Content>
                                <List.Header>Bagaimana cara mengganti alamat website nikahku?</List.Header>
                                <List.Description>Fitur ini akan segera ada! Kalau hal ini penting untukmu, silakan tinggalkan komentar <a href="/contact">di sini</a></List.Description>
                            </List.Content>
                        </List.Item>

                        <List.Item as='a'>
                            <Icon name='help'/>
                            <List.Content>
                                <List.Header>Apakah NikahKu menjual nama domain custom?</List.Header>
                                <List.Description>Fitur ini akan segera ada! Kalau hal ini penting untukmu, silakan tinggalkan komentar <a href="/contact">di sini</a>.</List.Description>
                            </List.Content>
                        </List.Item>

                        <List.Item as='a'>
                            <Icon name='help'/>
                            <List.Content>
                                <List.Header>Bagaimana cara untuk tahu alamat website nikahan saya di NikahKu?</List.Header>
                                <List.Description>Klik <a href="/create">di sini</a>. Lalu buka Pengaturan Website.</List.Description>
                            </List.Content>
                        </List.Item>
                    </List>

                    <h5>MEMBANGUN WEBSITE-MU</h5>
                    <List>
                        <List.Item as='a'>
                            <Icon name='help'/>
                            <List.Content>
                                <List.Header>Bagaimana cara menghapus acara?</List.Header>
                                <List.Description>Untuk menghapus acara, buka Bagian Acara, lalu klik X Hapus.</List.Description>
                            </List.Content>
                        </List.Item>

                        <List.Item as='a'>
                            <Icon name='help'/>
                            <List.Content>
                                <List.Header>Bagaimana cara membuat website?</List.Header>
                                <List.Description>* Pertama, Daftar <a href="/login">di sini</a>. Lalu, isi informasi umum. Pilih template (Tenang, nanti kamu bisa ganti seandainya berubah pikiran). Klik bagian berikutnya dan isi semua sampai halamanmu lengkap. Yang wajib diisi hanya bidang bertanda "*". Kamu bisa pilih "Tampil" atau "Sembunyikan" halamanmu sewaktu kamu sedang mengedit. Setelah semua selesai diisi, tinggal buka "Pengaturan Website" lalu klik "Publikasikan". Tada! Website nikahanmu sudah jadi!</List.Description>
                                <List.Description>* Tip: Hal pertama yang bakal dilihat tamumu adalah halaman beranda, jadi masukkan info paling penting di sini: foto, nama, tanggal pernikahan, tagar, dan kisahmu (misalnya, gimana kalian bertemu, kencan pertama, atau waktu dia melamar).</List.Description>
                            </List.Content>
                        </List.Item>

                        <List.Item as='a'>
                            <Icon name='help'/>
                            <List.Content>
                                <List.Header>Bagaimana cara menyembunyikan halaman di website?</List.Header>
                                <List.Description>Buka tab yang mau kamu sembunyikan, lalu geser bar dari "Tampil" ke "Sembunyikan"</List.Description>
                            </List.Content>
                        </List.Item>

                        <List.Item as='a'>
                            <Icon name='help'/>
                            <List.Content>
                                <List.Header>Bagaimana cara mengganti nama halaman di website?</List.Header>
                                <List.Description>Kamu bisa mengganti nama website di setiap Bagian pada "Judul". Ini akan jadi judul yang muncul di Menu website kamu.</List.Description>
                            </List.Content>
                        </List.Item>
                    </List>

                    <h5>BERBAGI WEBSITE-MU</h5>
                    <List>
                        <List.Item as='a'>
                            <Icon name='help'/>
                            <List.Content>
                                <List.Header>Bagaimana cara membuat website-ku publik atau private?</List.Header>
                                <List.Description>Kamu bisa menggantinya di "Pengaturan Website".</List.Description>
                            </List.Content>
                        </List.Item>

                        <List.Item as='a'>
                            <Icon name='help'/>
                            <List.Content>
                                <List.Header>Bagaimana cara membagi website ke para tamu?</List.Header>
                                <List.Description>Kamu bisa membagi link di "Pengaturan Website" setelah kamu mengeset website untuk publik.</List.Description>
                            </List.Content>
                        </List.Item>

                        <List.Item as='a'>
                            <Icon name='help'/>
                            <List.Content>
                                <List.Header>Bagaimana cara membuat website terlindungi password?</List.Header>
                                <List.Description>Fitur ini akan segera ada! Kalau hal ini penting untukmu, silakan tinggalkan komentar <a href="/contact">di sini</a>.</List.Description>
                            </List.Content>
                        </List.Item>

                        <List.Item as='a'>
                            <Icon name='help'/>
                            <List.Content>
                                <List.Header>Bagaimana cara mengontrol website-ku agar bisa dicari di mesin pencarian atau NikahKu?</List.Header>
                                <List.Description>Fitur ini akan segera ada! Kalau hal ini penting untukmu, silakan tinggalkan komentar <a href="/contact">di sini</a>.</List.Description>
                            </List.Content>
                        </List.Item>
                    </List>

                    <h5>DESAIN WEBSITE</h5>
                    <List>
                        <List.Item as='a'>
                            <Icon name='help'/>
                            <List.Content>
                                <List.Header>Bagaimana cara mengganti desain website-ku?</List.Header>
                                <List.Description>Kamu bisa melakukannya di bagian "Pilih Template". Sering-sering cek bagian ini untuk template baru.</List.Description>
                            </List.Content>
                        </List.Item>

                        <List.Item as='a'>
                            <Icon name='help'/>
                            <List.Content>
                                <List.Header>Bisakah mengganti warna desain website?</List.Header>
                                <List.Description>Tentu aja! Kami punya paling tidak 2 variasi warna untuk setiap template. Kalau ada sesuatu yang ingin kamu jadikan template, silakan tinggalkan komentar <a href="/contact">di sini</a>.</List.Description>
                            </List.Content>
                        </List.Item>
                    </List>

                </div>

                <Footer/>
            </React.Fragment>
        )
    }
}

function Service({label, icon, link}) {
    return (
        <div style={{flex: 1, textAlign: 'center'}}>
            {link ? <Link to={link}>
                <img style={{height: 80, width: 80}} src={icon}/>
                <p style={{textAlign: 'center'}}>{label}</p>
            </Link> :
                <React.Fragment>
                    <img style={{height: 80, width: 80}} src={icon}/>
                    <p style={{marginBottom: 2, textAlign: 'center'}}>{label}</p>
                    {!link && <p style={{fontSize: 11}}>(Coming soon!)</p>}
                </React.Fragment>}
        </div>
    )
}

function Section({label, done, k}) {
    return (
        <Link to={"/create#" + k}>
            <p style={{fontSize: 18, marginTop: 30, marginLeft: 10}}>
                {done &&
                <Icon style={{fontSize: 20, paddingRight: 10, color: '#63E09C'}} name='check circle'/>}

                {!done &&
                <Icon style={{fontSize: 18, paddingRight: 10, color: '#ddd'}} name='circle'/>}

                {label}
                <Icon style={{fontSize: 12, paddingLeft: 10, color: '#888'}} name='pencil'/>
            </p>
        </Link>
    )
}
export default connect(state => {
    return {
        website: state.website,
        user: state.user
    }
})(Website)
