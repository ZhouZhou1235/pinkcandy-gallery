import { useEffect, useState } from "react";
import { DefaultObj, GArea } from "../../code/vars";
import { getRequest, postRequest, urls } from "../../code/api";
import { objSortBy, objToFormdata } from "../../code/utils";
import { useNavigate } from "react-router";
import { TagList } from "../TagList";

export function ArtworkForm() {
    const navigate = useNavigate();
    const [tagOptions, setTagOptions] = useState<Array<{ label: string; value: string }>>([]);
    const [btnDisabled, setBtnDisabled] = useState(false);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState('');
    const [searchTagArray, setSearchTagArray] = useState(DefaultObj.tagArray);
    const [artworkForm, setArtworkForm] = useState({
        title: '',
        info: '',
        tags: '',
        grading: 0,
        file: null as File | null,
    });
    const [previewUrl, setPreviewUrl] = useState(GArea.defaultBackimage);

    async function loadTagOptions() {
        let options: Array<{ label: string; value: string }> = [];
        await getRequest(urls.getTags + `?num=${GArea.defaultShowNum * 100}`).then(data => {
            if (data != 0) {
                let tagList: any[] = data;
                tagList.sort(objSortBy('usenum', true));
                const top10Tags = tagList.slice(0, 10);
                for (let i = 0; i < top10Tags.length; i++) {
                    options.push({
                        label: top10Tags[i].tag,
                        value: top10Tags[i].tag,
                    });
                }
            }
        });
        setTagOptions(options);
    }

    async function searchToShowTags(tags: string[]) {
        const theTagText = tags.join(' ');
        await getRequest(urls.searchTags + `?tagtext=${theTagText}`).then(data => {
            if (data != 0) {
                let tagList: any[] = data;
                tagList.sort(objSortBy('usenum', true));
                tagList.splice(GArea.defaultShowNum);
                setSearchTagArray(tagList);
            }
        });
    }

    useEffect(() => {
        loadTagOptions();
    }, []);

    const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'Tab') {
            e.preventDefault();
            const newTag = tagInput.trim();
            if (newTag && !selectedTags.includes(newTag)) {
                const newTags = [...selectedTags, newTag];
                setSelectedTags(newTags);
                searchToShowTags(newTags);
                setArtworkForm(prev => ({ ...prev, tags: JSON.stringify(newTags) }));
                setTagInput('');
            }
        }
    };

    const handleTagClick = (tag: string) => {
        if (!selectedTags.includes(tag)) {
            const newTags = [...selectedTags, tag];
            setSelectedTags(newTags);
            searchToShowTags(newTags);
            setArtworkForm(prev => ({ ...prev, tags: JSON.stringify(newTags) }));
        }
    };

    const removeTag = (tagToRemove: string) => {
        const newTags = selectedTags.filter(tag => tag !== tagToRemove);
        setSelectedTags(newTags);
        searchToShowTags(newTags);
        setArtworkForm(prev => ({ ...prev, tags: JSON.stringify(newTags) }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        if (file) {
            setArtworkForm(prev => ({ ...prev, file }));
            const reader = new FileReader();
            reader.onload = (args) => {
                if (args.target?.result) {
                    setPreviewUrl(args.target.result as string);
                }
            };
            reader.readAsDataURL(file);
        } else {
            setPreviewUrl(GArea.defaultBackimage);
        }
    };

    function uploadArtwork() {
        if (!artworkForm.title.trim()) {
            alert('请填写标题');
            return;
        }
        if (!artworkForm.file) {
            alert('请选择图片文件');
            return;
        }
        setBtnDisabled(true);
        postRequest(urls.uploadArtwork, objToFormdata(artworkForm), { 'Content-Type': 'multipart/form-data' }).then(res => {
            if (typeof res == 'number') {
                if (res == 1) {
                    navigate('/');
                } else {
                    setBtnDisabled(false);
                    alert('上传失败，请重试');
                }
            }
        });
    }

    return (
        <div className="row">
            <div className="col-md-6 p-2">
                <div className="alert alert-info small">
                    只能由作者或经过作者授权上传。
                    至少上传图片、填写标题和选择分级，
                    图片仅支持png、jpg、gif格式，
                    超过5M的图片可能导致失败。
                    输入标签有利于搜索。
                </div>

                <div className="mb-3">
                    <label className="form-label fw-bold" style={{color:'orange'}}>上传作品</label>
                    <input
                        type="file"
                        className="form-control"
                        accept="image/png,image/jpeg,image/jpg,image/gif"
                        onChange={handleFileChange}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label fw-bold" style={{color:'orange'}}>标题</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="标题......"
                        onChange={(e) => setArtworkForm(prev => ({ ...prev, title: e.target.value }))}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label fw-bold">说明</label>
                    <textarea
                        className="form-control"
                        rows={4}
                        placeholder="描述此作品......"
                        onChange={(e) => setArtworkForm(prev => ({ ...prev, info: e.target.value }))}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label fw-bold" style={{color:'orange'}}>分级</label>
                    <select
                        className="form-select"
                        value={artworkForm.grading}
                        onChange={(e) => setArtworkForm(prev => ({ ...prev, grading: Number(e.target.value) }))}
                    >
                        <option value={0}>普遍级 - 公开可见</option>
                        <option value={1}>辅导级 - 点击进入可见</option>
                        <option value={2}>限制级 - 公开不可见</option>
                    </select>
                    <div className="form-text small text-muted">
                        默认普遍级，请根据作品内容选择合适的分级。
                    </div>
                </div>
                <div className="mb-3">
                    <label className="form-label fw-bold">标签</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="输入标签后按回车添加"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={handleTagKeyDown}
                    />
                    {tagOptions.length > 0 && (
                        <div className="mt-2">
                            <small className="text-muted">热门标签：</small>
                            <div className="d-flex flex-wrap gap-1 mt-1">
                                {tagOptions.map(opt => (
                                    <button
                                        key={opt.value}
                                        type="button"
                                        className="btn btn-sm btn-outline-secondary"
                                        onClick={() => handleTagClick(opt.value)}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                    {selectedTags.length > 0 && (
                        <div className="mt-2">
                            <small className="text-muted">已选标签：</small>
                            <div className="d-flex flex-wrap gap-1 mt-1">
                                {selectedTags.map(tag => (
                                    <span key={tag} className="badge bg-secondary d-inline-flex align-items-center gap-1">
                                        {tag}
                                        <button
                                            type="button"
                                            className="btn-close btn-close-white btn-sm"
                                            style={{ fontSize: '10px' }}
                                            onClick={() => removeTag(tag)}
                                            aria-label="移除"
                                        ></button>
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <TagList tagArray={searchTagArray} />

                <div className="mt-3">
                    <button
                        className="btn btn-outline-primary w-100"
                        onClick={uploadArtwork}
                        disabled={btnDisabled}
                    >
                        {btnDisabled ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                上传中......
                            </>
                        ) : '上传'}
                    </button>
                </div>
            </div>

            <div className="col-md-6 p-2">
                <div className="card">
                    <div className="card-body text-center">
                        <img
                            src={previewUrl}
                            alt="作品预览"
                            className="img-fluid rounded"
                            style={{ maxHeight: '400px', objectFit: 'contain' }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}