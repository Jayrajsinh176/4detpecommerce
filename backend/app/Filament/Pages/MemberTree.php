<?php

namespace App\Filament\Pages;

use Filament\Pages\Page;
use Filament\Support\Icons\Heroicon;

class MemberTree extends Page
{
    protected static string | \BackedEnum | null $navigationIcon = Heroicon::OutlinedShare;
  protected static string|\UnitEnum|null $navigationGroup = 'Member Panel';

    protected static ?int $navigationSort = 4;

     protected static ?string $navigationLabel = 'View Tree';
    public function getView(): string
    {
        return 'filament.pages.member-tree';
    }
}